---
title: 'Adding git hooks'
description: 'This post shows how to use git hooks, to prevent commit or push under certain circumstances, and particularly how to version those git hooks.'
published: true
datePublished: '2021-06-29T09:00:00.000Z'
author: Juangui Jordán
tags:
  - continuous-engineering
  - javascript
  - java
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2021-06_adding-git-hooks/adding-git-hooks.jpg'
thumbnailPhoto: '/img/blog/2021-06_adding-git-hooks/adding-git-hooks.jpg'
canonicalUrl: https://juanguijordan.com/blog/2021-06_adding-git-hooks
---

This post shows how to use git hooks, to prevent commit or push under certain circumstances, and particularly how to version those git hooks.

Git hooks are a collection of triggers that are bound to git commands, like checkout, commit or push. They let you run a script before/after the git command is actually executed, and return an exit code. For git hooks that are exectued before, if the exit code is not zero, the git command will not be executed.

Git hooks must be used in a git versioned project, since they are just bash scripts living in your `.git/hooks` folder. There are both client side and server side hooks. In this post we will talk about client side hooks.

Client git hooks include:

- **Committing-Workflow Hooks.** These are hooks that have to do with the committing process: `pre-commit`, `prepare-commit-msg`, `commit-msg` and `post-commit`.

- **Email Workflow Hooks.** Used for an email-based workflow: `applypatch-msg`, `pre-applypatch` and `post-applypatch`.

- **Other Client Hooks.** They include: `pre-rebase`, `post-rewrite`, `post-checkout`, `post-merge`, `pre-push`

I won't enter into details about what is the use of each hook. You can find more info on each individual hook purpose and triggering scenario on [Customizing-Git-Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

I will just mention an example. Some projects require by convention that the commit message includes a JIRA task name, so that the team members can easily track what commits were bound to which tasks in JIRA. If your JIRA task names include all a prefix like `PROJ`, that can be achieved with a `pre-commit` hook like this one:

```sh
#!/bin/bash
MSG="$1"

if ! grep -qE "PROJ" "$MSG";then
    cat "$MSG"
    echo "Your commit message must contain the task name starting with 'PROJ'"
    exit 1
fi
```

The script above returns a `1` if the commit message doesn't include the word `PROJ` in it, and that will prevent the commit to run. If the commit message includes it, like in `"PROJ-202 - Refactored CSS styles"`, then the commit will take place.

You may be wondering, _"ok, but how can I actually store the hooks in my git versioned project if they sit inside the `.git` folder"_, and that is actually impossible. You can not commit files inside that directory. You would need to tell each developer in your project to copy them, or have a script that copies the hooks, then tell everyone to run it. Not practical, uh?

## Versioning git hooks in Javascript projects

In Javascript projects with a `package.json` we can use [Husky](https://typicode.github.io/husky) to take care of git hooks and their versioning inside the project.

First of all, we must install Husky in the project:

```sh
npx husky-init && yarn
```

This will add a couple of things in `package.json`:

- the husky dependency to our `devDependencies` section
- a `prepare` script to our `scripts` section

The `yarn` part will install the dependencies and execute the `prepare` script. After that, a `.husky` directory will be created in the root of the project which contains a sample `pre-commit` hook, a `.gitignore` file and a `_` folder with the `husky.sh` script.

With that configuration you don't need to manually copy your hooks to `.git/hooks` folder: the `husky.sh` script will take care of using the hooks sitting in the `.husky` folder.

You can now edit the sample `pre-commit` hook, delete it, or create new ones in the `.husky` folder, manually or via the bash `npx husky add` command. For instance, if we were to create a `pre-push` hook that runs `lint` and `test` we could just run:

```sh
npx husky add .husky/pre-push "yarn lint && yarn test"
```

The result will be something like:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint && yarn test

```

## Versioning hooks in Maven Java projects

Now for Java projects managed by Maven with a `pom.xml` file, I couldn't find anything like Husky.

The best approach here was using the `maven-resources-plugin` to copy the hooks from a `git-hooks` source directory to the `.git/hooks` destination folder.

This is what I added to my `build` section in the `pom.xml`:

```xml
<build>
  <plugins>
    <plugin>
      <artifactId>maven-resources-plugin</artifactId>
      <version>3.2.0</version>
      <executions>
        <execution>
          <id>copy-hooks</id>
          <phase>validate</phase>
          <goals>
            <goal>copy-resources</goal>
          </goals>
          <configuration>
            <outputDirectory>${basedir}/.git/hooks</outputDirectory>
            <resources>
              <resource>
                <directory>git-hooks</directory>
              </resource>
            </resources>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

After that, calling the command `mvn validate` or any other maven command that calls `validate`, like `package`, will install the hooks in the first place.

## Bypassing git hooks

What if we have a git hook that takes a lot of time to execute and gets into our way for everyday programming tasks? For instance, if we had a `pre-commit` hook that launched our unit tests and those tests took 30 minutes to run, then everytime we committed we would have to wait that much long. We might want to just run the tests on the last commit before the push, and not on every commit, to save us some time.

On such cases, we can bypass the git hooks, if we know what we are doing:

```sh
git commit --no-verify -m "An unverifed commit"
```

## Conclussion

I hope this post helps you to integrate git hooks in your projects. They can help you enforce some policies and guidelines to improve quality standards on your team.

## Credits

Photo by Anne Nygard on [Unsplash](https://unsplash.com/).
