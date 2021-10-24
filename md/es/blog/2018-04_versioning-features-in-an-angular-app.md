---
title: 'Versionar características en una aplicación angular'
description: 'Versionar componentes e instanciar la versión adecuada de forma dinámica no solo es posible, sino que también tiene algunos casos de uso. Consulta esta publicación donde explico cómo lograr eso usando un ComponentFactoryResolver y directivas estructurales.'
published: true
datePublished: '2018-04-24T09:00:00.000Z'
author: Juangui Jordán
tags:
  - javascript
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2018-04_versioning-features-in-an-angular-app/versioning-features-in-an-angular-app.png'
thumbnailPhoto: '/img/blog/2018-04_versioning-features-in-an-angular-app/versioning-features-in-an-angular-app.png'
canonicalUrl: https://juanguijordan.com/blog/2018-04_versioning-features-in-an-angular-app
---

Imagina un escenario en el que tu aplicación debe mostrar diferentes versiones de un componente o servicios a diferentes grupos de usuarios. Si suena un poco traído por los pelos, toma el siguiente escenario que se propuso a nuestro equipo de desarrollo en cierto proyecto real:

- La aplicación se descarga desde **Google Play/App Store** y se implementará en diferentes países, utilizando el mismo app ID.
- Los diferentes países tienen diferentes regulaciones sobre si la aplicación puede mostrar fotografías de usuarios, campos específicos, etc. Además, algunas funciones deberían estar totalmente deshabilitadas en algunos países.
- La aplicación seguirá creciendo en funcionalidad, pero no necesariamente al mismo tiempo para todos los países:
  algunos países pueden decidir no actualizar alguna función o actualizarla más tarde;
  algunos países pueden tomar más tiempo para revisar si alguna característica nueva en particular sigue sus regulaciones de privacidad ...

El enfoque ingenuo de tener directivas `ngIf` por todas partes puede funcionar para los casos más simples
pero sería difícil de mantener y también saturaría nuestras hermosas plantillas.
Además, los componentes que utilizan diferentes servicios al cambiar de una versión a otra serían muy difíciles de mantener.

Así que decidimos utilizar el siguiente enfoque para hacer frente a todas esas situaciones:

- Crear una directiva para mostrar/ocultar partes de una plantilla según el país y la versión.
  Eso sería como una extensión de `ngIf` con nuestros parámetros `country` y `version`,
  y daría una respuesta a problemas simples como ocultar una funcionalidad completa en algunos países,
  u ocultar un campo en particular para algunos países/versiones.
- Crear una directiva que devuelva un componente dinámico, según los parámetros `country` y `version`.
  Esta directiva se utilizaría para casos más generales,
  donde una versión de componente puede proporcionar una funcionalidad muy diferente a otra versión.

Para ilustrar este post, hemos creado una aplicación. Nuestra aplicación muestra con orgullo algunos datos de países,
como la bandera de un país, el área y la población.
Nos pusimos en contacto con gobiernos de todo el mundo y les pedimos amablemente que se unieran a nuestra revolucionaria aplicación sin fines de lucro. proporcionando algunos datos básicos:

- Nombre del país
- Área
- Población

Algunos de estos países tienen regulaciones muy severas y querían unirse a la aplicación,
pero sin revelar su área y población inicialmente,
hasta que sus abogados determinen si estos datos podrían mostrarse.
Por eso diseñamos la primera versión de la aplicación con una sola pantalla,
donde el usuario seleccionaría el país de un combo box,
y un componente con dos subcomponentes que muestran los datos del país:

- Un componente de encabezado para el nombre del país
- Un componente de contenido para los datos.

El componente de contenido debe ser opcional y se mostrará según las normativas del país.

![Diseño de la primera versión de los componentes](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v1.png)

Estas son algunas capturas de pantalla de la aplicación en este punto:

![Capturas de pantalla de la primera versión de la aplicación.](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v1_screenshots.png)

Después de la puesta en marcha, algunos usuarios estaban tan emocionados que empezaron a pedir algunas funcionalidades nuevas:

- Querían que se mostrara la bandera del país en el encabezado.
- Algunos datos más como capital del país y ¿qué más…? el himno nacional, claro.

El equipo de desarrollo estuvo de acuerdo en que, dado que algunos países aún no habían proporcionado su área y población,
Era razonable pensar que algunos de ellos no entregarían instantáneamente su bandera, capital e himno.
Así que decidimos versionar el encabezado y los componentes de contenido, de modo que pudiéramos darles un camino sencillo para actualizar sus datos sin dejar de verse bien en la aplicación, mostrando los componentes antiguos en lugar de los componentes nuevos con campos vacíos.

![Diseño de la versión final de los componentes](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v2.png)

Estas son algunas capturas de pantalla de la versión final de la aplicación:

![Screenshots of the final version of the app](/img/blog/2018-04_versioning-features-in-an-angular-app/features_v2_screenshots.png)

Nuestra aplicación se basa en dos directivas, como dijimos.
La primera mostrará/ocultará un elemento dependiendo de la disponibilidad de funciones para un determinado país,
donde las características serán `COUNTRY_HEADER` y `COUNTRY_CONTENT`.
Esta directiva obtendrá la disponibilidad de funciones de un servicio, el llamado `CountryConfigService`.

```typescript
import {
  CountryConfigDictionary,
  DEFAULT_COUNTRY_CONFIG,
  FeatureVersionDictionary,
} from './country-config.model';

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

La `config` es un objeto que sigue un modelo `CountryConfigDictionary`
que nos permite definir qué versión de los componentes `COUNTRY_HEADER` y `COUNTRY_CONTENT`,
si hay alguno, está usando cada país:

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

## La directiva FeatureIf

Con eso en mente, veamos la directiva `FeatureIf`.
Mostrará un elemento si la función está habilitada para el país.
Opcionalmente, podemos definir la versión mínima implementada por el país,
lo que significa que si el país usa una versión más baja, el elemento estará oculto.
Omitiré los imports estándar para ahorrar espacio en el listado:

```typescript
import { CountryConfigService } from '../../services/country-config/country-config.service';

@Directive({
  selector: '[appFeatureIf]',
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

Esta directiva estructural hace uso de 4 parámetros: `featureName`, `countryCode`, `featureVersion` y `else`.
Presta atención a cómo definimos las propiedades de entrada en una directiva estructural:

- La primera entrada toma el nombre de la misma directiva: `appFeatureIf`.
  Usamos un setter para guardarlo internamente como `_featureName`.
- El resto de entradas toman el nombre de la directiva más el nombre del parámetro.
  Por ejemplo, la entrada `appFeatureIfCountryCode` hace referencia al parámetro de directiva `countryCode`.
  También usamos aquí un setter para mapear la entrada a la variable privada `_countryCode`.

Observa a continuación cómo se utiliza la directiva en una plantilla.
El primer parámetro no necesita una clave, mientras que el resto se pasa con tuplas `"key: value"`, separadas por un punto y coma (`;`).

```html
<div *appFeatureIf="'COUNTRY_HEADER';countryCode:code;version:2">
  Show only for countries implementing the COUNTRY_HEADER feature with version
  >= 2
</div>

<div *appFeatureIf="'COUNTRY_HEADER';countryCode:code;version:2; else:'true'">
  Show otherwise
</div>
```

Lo que básicamente hace la directiva es:

- Registra cambios en cualquiera de los inputs.
- Cuando se crea una instancia de la directiva o cualquiera de los inputs cambia, ejecuta `applyChanges()`.
- Calcula si la funcionalidad está habilitada de acuerdo con `featureName`,` countryCode` y `minVersion`.
- Calcula si el elemento debe mostrarse.
  Si el parámetro `else` está definido y es `true`, se mostrará si la función está deshabilitada.
- Ejecuta `embedTemplate()`, que crea la vista embebida en el contenedor de la vista si el elemento debe mostrarse,
  o borra el contenedor de vista de lo contrario.

Usamos esta directiva en dos casos en nuestra aplicación.
En el encabezado, lo usamos para ocultar la bandera de los países que implementan la versión 1 de `COUNTRY_HEADER`.

```html
<div
  *appFeatureIf="'COUNTRY_HEADER';countryCode:country.code;
  version:2"
  class="flag {{country.code}}"
></div>
```

En el componente padre, usamos la directiva con el parámetro `else` a `true`,
para mostrar un texto informativo cuando el componente de contenido no está disponible.

```html
<div
  class="no-feature"
  *appFeatureIf="'COUNTRY_CONTENT';
  countryCode:country.code;else:'true'"
>
  This feature is not yet available in {{country.name}}.
</div>
```

## La directiva FeatureVersion

Nuestra segunda directiva nos permitirá inyectar dinámicamente un componente u otro, dependiendo de algunos parámetros.

```typescript
import { CountryConfigService } from '../../services/country-config/country-config.service';
import { DynamicComponentService } from '../../services/dynamic-component/dynamic-component.service';
import { DynamicComponent } from '../../services/dynamic-component/dynamic-component.model';

@Directive({
  selector: '[appFeatureVersion]',
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
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
  }

  private injectComponentData(): void {
    this.componentRef.instance.data = this._data;
  }
}
```

Esta vez, la directiva toma tres parámetros: `featureName`, `countryCode` y `data`.
El parámetro `data` se utilizará para pasar datos a nuestro componente dinámico.
Dado que los diferentes componentes pueden tener diferentes entradas,
tomamos el enfoque de recibir cualquier dato externo a través de este objeto `data`.
Los componentes dinámicos también pueden recibir datos externos a través de servicios, como veremos más adelante.

Entonces, básicamente, lo que hace esta directiva es:

- Registra cambios en alguna de los inputs.
- Cuando se instancia la directiva o cualquiera de los inputs cambia, ejecuta `applyChanges()`.
- Calcula si la función está habilitada según el nombre de la funcionalidad y el código de país.
- Obtiene el tipo de componente dinámico para el nombre de la funcionalidad y la versión de `DynamicComponentService`.
- Borra el view container.
- Si se recuperó con éxito un tipo de componente dinámico, ejecuta `embedTemplate()`,
  que resuelve una factoría para este tipo de componente y crea la vista embebida en el view container.
- Finalmente, inyecta el objeto de datos en el componente instanciado dinámicamente.

Veamos el código para esas clases `DynamicComponent` y `DynamicComponentService`.

El `DynamicComponent` es solo una clase con una propiedad pública `data`.
También crearemos una interfaz de diccionario y una constante con las clases de componentes dinámicos actuales
(versiones de contenido del país 1 y 2) que será utilizado por el servicio.

```typescript
import { CountryContentV1Component } from '../../../country/components/country-content/v1/country-content.v1.component';
import { CountryContentV2Component } from '../../../country/components/country-content/v2/country-content.v2.component';

export class DynamicComponent {
  data: any;
}

export interface DynamicComponentDictionary {
  [key: string]: {
    [key: number]: Type<DynamicComponent>;
  };
}

export const DEFAULT_DYNAMIC_COMPONENT_DICTIONARY: DynamicComponentDictionary =
  {
    COUNTRY_CONTENT: {
      1: CountryContentV1Component,
      2: CountryContentV2Component,
    },
  };
```

`DynamicComponentService` simplemente devuelve la clase de componente adecuada,
dependiendo de los parámetros `featureName` y `version`.

```typescript
import {
  DEFAULT_DYNAMIC_COMPONENT_DICTIONARY,
  DynamicComponent,
  DynamicComponentDictionary,
} from './dynamic-component.model';

@Injectable()
export class DynamicComponentService {
  private componentDictionary: DynamicComponentDictionary =
    DEFAULT_DYNAMIC_COMPONENT_DICTIONARY;

  getComponent(featureName: string, version: number): Type<DynamicComponent> {
    const selectedComponent = this.componentDictionary[featureName]
      ? this.componentDictionary[featureName][version]
      : undefined;
    return selectedComponent;
  }
}
```

Veamos cómo se usa esta directiva en el componente principal.

```html
<ng-template
  *appFeatureVersion="'COUNTRY_CONTENT';
  countryCode:country.code;data:{country: country}"
>
</ng-template>
```

Este es el código de la clase `CountryContentV1Component`.

```typescript
import { DynamicComponent } from '../../../../shared/services/dynamic-component/dynamic-component.model';
import { Country } from '../../../services/country.model';

@Component({
  selector: 'app-country-content-v1',
  templateUrl: './country-content.v1.component.html',
  styleUrls: ['./country-content.v1.component.scss'],
})
export class CountryContentV1Component implements DynamicComponent {
  data: { country: Country };
}
```

Y así es como la plantilla usa la propiedad `data` para mostrar los datos del país.

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

Puedes ver una demo de la aplicación aquí:  
https://stackblitz.com/edit/component-version-demo

## Servicios versionados

La situación puede complicarse un poco más si los servicios también están versionados.
Imaginemos que la primera versión del servicio que proporciona datos del país solo incluye el nombre del país,
área y población, y que se debe crear una nueva versión para incluir los nuevos datos,
al mismo tiempo que proporciona la versión anterior para compatibilidad con versiones anteriores.

En este caso podemos inyectar la versión de servicio correspondiente en los componentes versionados.
No usaremos la propiedad `data` de `DynamicComponent`, sino que obtendremos los datos del servicio.
También podríamos usar _injection tokens_ para inyectar dinámicamente el servicio versionado dependiendo de ciertas condiciones.

La siguiente demo es un enfoque simple que utiliza servicios versionados:  
https://stackblitz.com/edit/component-version-demo-services

## Consideraciones finales

La aplicación de demo probablemente sea demasiado simple para ese tipo de solución.
Podríamos haber usado inteligentemente algunas combinación de `ngIf` y `ngTemplate` para llegar a la misma solución.
Pero piensa en un caso en el que el usuario no selecciona el país de un cuadro combinado,
sino que el país se detecta automáticamente desde la configuración de su dispositivo,
y piensa en una interfaz de usuario más complicada con un panel con varios widgets que deberían mostrarse u ocultarse,
o tener contenido diferente según el país, y entonces este enfoque tendrá mucho más sentido.

Este post es lo suficientemente largo para entrar en más detalles.
Si tienes sugerencias para mejorarlo, inclúyelas en tus comentarios :)
