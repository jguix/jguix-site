---
title: "Versioning features in an angular app"
excerpt: "Versioning components and instantiating the appropriate version dynamically is not only possible but also has some use cases. Check this post where I explain how to accomplish that using a ComponentFactoryResolver and structural directives."
published: true
datePublished: 1524553200000
date: "2018-04-24T09:00:00.000Z"
author: Juangui Jordán
tags:
  - Dan Abramov
authorPhoto: /img/authors/jguix.jpeg
bannerPhoto: "/img/blog/2018-04_versioning-features-in-an-angular-app/versioning-features-in-an-angular-app.png"
thumbnailPhoto: "/img/blog/2018-04_versioning-features-in-an-angular-app/versioning-features-in-an-angular-app.png"
canonicalUrl: https://juanguijordan.com/blog/2018-04_versioning-features-in-an-angular-app
---

Imagine a scenario where your app needs to show different versions of a component or services to different groups of users.
If it sounds a bit farfetched, take the following scenario that was proposed to our development team in some real project:

- The app is downloaded from **Google Play/App Store**, and will be deployed in different countries, using the same app ID.
- Different countries have different regulations as to whether the app can display user photographies, specific fields, and so on.
  Also, some features should be totally disabled in some countries.
- The app will keep growing in functionality, but not necessarily at the same time for all countries:
  some countries may decide not to upgrade some feature, or upgrade it later;
  some countries may take more time to review if some particular new feature follows their privacy regulations…

The naive approach of having ngIf directives all over the place can work for the simpler cases
but it would be hard to maintain and would also clutter our beautiful templates.
Also, components using different services when switching from one version to another would be very difficult to maintain.

So we came up to the following approach, to cope with all those situations:

- Create a directive to show/hide parts of a template depending on the country and version.
  That would be like an extension of _ngIf_ with our _country_ and _version_ parameters,
  and would give an answer to simple problems like hiding a whole feature in some countries,
  or hiding a particular field for some countries/versions.
- Create a directive that returns a dynamic component, depending on the _country_ and _version_ parameters.
  This directive would be used for more general cases,
  where a component version can provide very different functionality from another version.

To illustrate this post, we created an app. Our app proudly shows some country data,
like a country flag, area and population.
We made contact with governments all over the world and kindly asked them to join our non-profit revolutionary app,
providing some basic data:

- Country name
- Area
- Population

Some of these countries have really severe regulations and wanted to join the app,
but without revealing their area and population initially,
until their lawyers would determine if this data could be displayed.
So we designed the first version of the app with a single screen,
where the user would select the country from a select combo box,
and a component with two subcomponents displaying the country data:

- A header component for the country name
- A content component for the data

The content component should be optional, and will display depending on the country’s regulations.

![Design of the first version of the components](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v1.png)

These are some screenshots of the app at this point:

![Screenshots of the first version of the app](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v1_screenshots.png)

After the kick off, some users were so excited that started to ask for some new features:

- They wanted to get the country flag displayed in the header
- Some more data like country capital and wait for it… the national anthem, of course

The development team agreed that, given that some countries still had not provided their area and population,
it was reasonable to think that some of them would not provide instantly their flag, capital and anthem.
So we decided to version the header and content components, so we could give them a smooth path to upgrade their data,
while still looking good in the app, showing the old components instead of new components with empty fields.

![Design of the final version of the components](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v2.png)

These are some screenshots of the final version of the app:

![Screenshots of the final version of the app](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v2_screenshots.png)

Our app builds on two directives, as we said.
The first one will show/hide an element depending on the feature availability for a certain country,
where the features will be _COUNTRY_HEADER_ and _COUNTRY_CONTENT_.
This directive will get the feature availability from a service, the so called _CountryConfigService_.

```typescript
import {
  CountryConfigDictionary,
  DEFAULT_COUNTRY_CONFIG,
  FeatureVersionDictionary,
} from "./country-config.model";

@Injectable()
export class CountryConfigService {
  private config: CountryConfigDictionary = DEFAULT_COUNTRY_CONFIG;
  getCountryFeatures(countryCode: string): FeatureVersionDictionary {
    return this.config[countryCode].features;
  }

  isFeatureEnabled(feature: string, countryCode: string): boolean {
    const countryFeatures = this.getCountryFeatures(countryCode);
    return countryFeatures.hasOwnProperty(feature);
  }

  getFeatureVersion(feature: string, countryCode: string): number {
    const countryFeatures = this.getCountryFeatures(countryCode);
    return countryFeatures[feature];
  }
}
```

The _config_ is an object following a _CountryConfigDictionary_ model
that lets us define which version of the _COUNTRY_HEADER_ and _COUNTRY_CONTENT_ components,
if any, is using each country:

```typescript
export const DEFAULT_COUNTRY_CONFIG: CountryConfigDictionary = {
  es: {
    features: {
      COUNTRY_HEADER: 2,
      COUNTRY_CONTENT: 2,
    },
  },
  fr: {
    features: {
      COUNTRY_HEADER: 2,
      COUNTRY_CONTENT: 2,
    },
  },
  it: {
    features: {
      COUNTRY_HEADER: 2,
      COUNTRY_CONTENT: 1,
    },
  },
  pt: {
    features: {
      COUNTRY_HEADER: 1,
      COUNTRY_CONTENT: 1,
    },
  },
  uk: {
    features: {
      COUNTRY_HEADER: 1,
    },
  },
};
```

## The FeatureIf directive

With that in mind, let’s see the _FeatureIf_ directive.
It will display an element if the feature is enabled for the country.
Optionally, we can define the minimum version implemented by the country,
meaning that if the country uses a lower version, the element will be hidden.
I will skip the standard imports to save space in the listing:

```typescript
import { CountryConfigService } from "../../services/country-config/country-config.service";

@Directive({
  selector: "[appFeatureIf]",
})
export class FeatureIfDirective implements OnChanges {
  private _featureName: string;
  private _countryCode: string;
  private _minVersion = 0;
  private _else = false;
  private _hasView: boolean;

  @Input() set appFeatureIf(featureName: string) {
    this._featureName = featureName;
  }

  @Input() set appFeatureIfCountryCode(value: string) {
    this._countryCode = value;
  }

  @Input() set appFeatureIfVersion(value: number) {
    this._minVersion = value;
  }

  @Input() set appFeatureIfElse(value: boolean) {
    this._else = value;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private countryConfigService: CountryConfigService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.applyChanges();
    }
  }

  private applyChanges(): void {
    const featureEnabled = this.countryConfigService.isFeatureEnabled(
      this._featureName,
      this._countryCode
    );
    const featureVersion =
      this.countryConfigService.getFeatureVersion(
        this._featureName,
        this._countryCode
      ) || 0;
    const enabled: boolean =
      featureEnabled && featureVersion >= this._minVersion;
    const displayed: boolean =
      (enabled && !this._else) || (!enabled && this._else);
    this.embedTemplate(displayed);
  }

  private embedTemplate(enabled): void {
    if (enabled && !this._hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this._hasView = true;
    } else if (!enabled && this._hasView) {
      this.viewContainerRef.clear();
      this._hasView = false;
    }
  }
}
```

This structural directive makes use of 4 parameters: _featureName_, _countryCode_, _featureVersion_ and _else_.
Pay attention on how we define input properties in a structural directive:

- The first input takes the name of the very same directive: _appFeatureIf_.
  We use a setter to internally save it as _\_featureName_.
- The rest of the inputs take the name of the directive plus the name of the parameter.
  For instance, the input _appFeatureIfCountryCode_ references the directive parameter _countryCode_.
  We also use here a setter to map the input to the private variable _\_countryCode_.

Please remark below how the directive is used in a template.
The first parameter doesn’t need a key, while the rest is passed with _“key: value”_ tuples, separated by a semicolon (;).

```html
<div *appFeatureIf="'COUNTRY_HEADER';countryCode:code;version:2">
  Show only for countries implementing the COUNTRY_HEADER feature with version
  >= 2
</div>

<div *appFeatureIf="'COUNTRY_HEADER';countryCode:code;version:2; else:'true'">
  Show otherwise
</div>
```

What the directive basically does is:

- Registers for changes in any of the inputs.
- When the directive is instantiated or any of the input changes, executes _applyChanges()_.
- Computes if the feature is enabled according to feature _name_, _country code_ and _version_.
- Computes if the element has to be displayed.
  If the _else_ parameter is defined and true, then it will be displayed if the feature is disabled.
- Executes _embedTemplate()_, which creates the embedded view into the view container if the element should be displayed,
  or clears the view container otherwise.

We use this directive in two cases in our app.
In the header, we use it to hide the flag for countries implementing _COUNTRY_HEADER_ version 1.

```html
<div
  *appFeatureIf="'COUNTRY_HEADER';countryCode:country.code;
  version:2"
  class="flag {{country.code}}"
></div>
```

In the parent component, we use the directive with the _else_ parameter set to _true_,
to display an informative text when the content component is not available.

```html
<div
  class="no-feature"
  *appFeatureIf="'COUNTRY_CONTENT';
  countryCode:country.code;else:'true'"
>
  This feature is not yet available in {{country.name}}.
</div>
```

## The FeatureVersion directive

Our second directive will allow us to dynamically inject a component or another, depending on some parameters.

```typescript
import { CountryConfigService } from "../../services/country-config/country-config.service";
import { DynamicComponentService } from "../../services/dynamic-component/dynamic-component.service";
import { DynamicComponent } from "../../services/dynamic-component/dynamic-component.model";

@Directive({
  selector: "[appFeatureVersion]",
})
export class FeatureVersionDirective implements OnChanges {
  private _featureName: string;
  private _countryCode: string;
  private _data: any;
  private componentRef: ComponentRef<DynamicComponent>;

  @Input() set appFeatureVersion(featureName: string) {
    this._featureName = featureName;
  }

  @Input()
  set appFeatureVersionCountryCode(value: string) {
    this._countryCode = value;
  }

  @Input()
  set appFeatureVersionData(value: any) {
    this._data = value;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private countryConfigService: CountryConfigService,
    private dynamicComponentService: DynamicComponentService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.applyChanges();
    }
  }

  private applyChanges(): void {
    const featureEnabled = this.countryConfigService.isFeatureEnabled(
      this._featureName,
      this._countryCode
    );
    const featureVersion =
      this.countryConfigService.getFeatureVersion(
        this._featureName,
        this._countryCode
      ) || 0;
    const dynamicComponent = this.dynamicComponentService.getComponent(
      this._featureName,
      featureVersion
    );
    this.clearViewContainer();
    if (featureEnabled && dynamicComponent) {
      this.embedComponent(dynamicComponent);
      this.injectComponentData();
    }
  }

  private clearViewContainer(): void {
    this.viewContainerRef.clear();
  }

  private embedComponent(component: Type<DynamicComponent>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
  }

  private injectComponentData(): void {
    this.componentRef.instance.data = this._data;
  }
}
```

This time, the directive takes three parameters: _featureName_, _countryCode_ and _data_.
The _data_ parameter will be used to pass data to our dynamic component.
Since different components may have different inputs,
we took the approach of receiving any external data through this _data_ object.
Dynamic components may also receive external data through services, as we will see later.

So basically, what this directive does is:

- Registers for changes in any of the inputs.
- When the directive is instantiated or any of the input changes, executes _applyChanges()_.
- Computes if the feature is enabled according to feature name and country code.
- Gets the dynamic component type for the feature name and version from the _DynamicComponentService_.
- Clears the view container.
- If a dynamic component type was retrieved successfully, executes _embedTemplate()_,
  which resolves a factory for this type of component and creates the embedded view into the view container.
- Finally, it injects the data object into the dynamically instantiated component.

Let’s see the code for those _DynamicComponent_ and _DynamicComponentService_ classes.

The _DynamicComponent_ is just a class with a public _data_ property.
We will also create a dictionary interface and a constant with the current dynamic component classes
(country content version 1 and 2) that will be used by the service.

```typescript
import { CountryContentV1Component } from "../../../country/components/country-content/v1/country-content.v1.component";
import { CountryContentV2Component } from "../../../country/components/country-content/v2/country-content.v2.component";

export class DynamicComponent {
  data: any;
}

export interface DynamicComponentDictionary {
  [key: string]: {
    [key: number]: Type<DynamicComponent>;
  };
}

export const DEFAULT_DYNAMIC_COMPONENT_DICTIONARY: DynamicComponentDictionary = {
  COUNTRY_CONTENT: {
    1: CountryContentV1Component,
    2: CountryContentV2Component,
  },
};
```

The _DynamicComponentService_ simply returns the appropriate component class,
depending on the _featureName_ and _version_ parameters.

```typescript
import {
  DEFAULT_DYNAMIC_COMPONENT_DICTIONARY,
  DynamicComponent,
  DynamicComponentDictionary,
} from "./dynamic-component.model";

@Injectable()
export class DynamicComponentService {
  private componentDictionary: DynamicComponentDictionary = DEFAULT_DYNAMIC_COMPONENT_DICTIONARY;

  getComponent(featureName: string, version: number): Type<DynamicComponent> {
    const selectedComponent = this.componentDictionary[featureName]
      ? this.componentDictionary[featureName][version]
      : undefined;
    return selectedComponent;
  }
}
```

Let’s see how this directive is used in the parent component.

```html
<ng-template
  *appFeatureVersion="'COUNTRY_CONTENT';
  countryCode:country.code;data:{country: country}"
>
</ng-template>
```

This is the code for the _CountryContentV1Component_ class.

```typescript
import { DynamicComponent } from "../../../../shared/services/dynamic-component/dynamic-component.model";
import { Country } from "../../../services/country.model";

@Component({
  selector: "app-country-content-v1",
  templateUrl: "./country-content.v1.component.html",
  styleUrls: ["./country-content.v1.component.scss"],
})
export class CountryContentV1Component implements DynamicComponent {
  data: { country: Country };
}
```

And this is how the template uses the _data_ property to display the country data.

```html
<div class="country-content">
  <div class="data-row">
    <span class="data-label"> Area: </span>
    <span class="data-value"> {{data.country.area | number}} </span>
  </div>
  <div class="data-row">
    <span class="data-label"> Population: </span>
    <span class="data-value"> {{data.country.population | number}} </span>
  </div>
</div>
```

You can see a demo of the application here:

https://stackblitz.com/edit/component-version-demo

## Versioned services

The situation can get a bit more complicated if services are also versioned.
Let’s imagine that the first version of the service providing country data just included the country name,
area and population, and that a new version should be created to include the new data,
while still providing the old version for backward compatibility.

In this case we can inject the corresponding service version in the versioned components.
We won’t be using the _data_ property from _DynamicComponent_, but will get the data from the service instead.
We could also use injection tokens to dynamically inject the versioned service depending on certain conditions.

The following demo is a simple approach using versioned services.

https://stackblitz.com/edit/component-version-demo-services

## Final considerations

The demo app is probably too simple for that kind of solution.
We could still smartly use some _ngIf_ and _ngTemplate_ stuff to get to the same solution.
But think of a case where the user doesn’t select the country from a combo box,
but the country gets auto detected from your device settings,
and think of a more complicated UI with a dashboard with several widgets that should be displayed or hidden,
or have different content according to the country, and then this approach will make much more sense.

This post is long enough to get into more details.
If you have suggestions to enhance it, please include them in your comments :)
