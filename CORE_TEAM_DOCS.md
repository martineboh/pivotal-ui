# Core Team Docs

## Environments

- Staging: [http://styleguide-staging.cfapps.io](http://styleguide-staging.cfapps.io) - org: pivotal, space: pivotal-ui-staging
- Production: [http://styleguide.pivotal.io](http://styleguide.pivotal.io) - org: pivotal, space: pivotal-ui

## New member checklist

- Add to GitHub, ADT CLA google group, tracker, Google drive folder, and calendar invites (IPM, retro, standup)
- Add new member's NPM login to the publish helper in `tasks/helpers/publish-helper.js`
- Add to ~/.gitauthors file on all team computers

## Setting up your environment

See the [contribution guidelines](https://github.com/pivotal-cf/pivotal-ui/blob/master/CONTRIBUTING.md#setting-up-your-environment)
for detailed instructions.

## CI

We use [Concourse](https://wings.concourse.ci/teams/pivotalui/pipelines/pivotal-ui)

## Deploying the Styleguide

The [staging styleguide](http://styleguide-staging.cfapps.io) deploys automatically when your changes are merged into
development on GitHub and all the tests go green on CI.  The [production styleguide](http://styleguide.pivotal.io/)
deploys as part of the [release process](#creating-a-new-release).

## New Components

Once we merge in a PR, it is our responsibility to properly publish new components.

1. Ensure that all dependencies are listed in the component's `package.json`.
1. Ensure that there is an example in the styleguide.
1. It can be helpful to set the version number in the `package.json` files to `0.0.1`
   so there is room to fix any errors after first publishing the module.
1. [Publish the module to NPM](#publishing-new-modules).
1. Add the newly published component as a dependency in the top-level `package.json`.
1. Add new css modules as dependencies to the `all` css component.
1. Require/export any new React components in `styleguide/src/pivotal-ui-components.js`.

### Publishing new modules

Our release helper will automatically update the versions of current modules.
If you create a new CSS or React component, you will have to publish the modules
to NPM manually.

First, make sure you are logged into NPM in the terminal:

```
npm login
```

Then, do one of the following:

```
gulp css-publish --component <COMPONENT-NAME>
gulp react-publish --component <COMPONENT-NAME>
```

where `<COMPONENT-NAME>` is the name of the folder in `library/src/pivotal-ui/components/`
or `library/src/pivotal-ui-react/`.

Once you do this initial publishing, you never have to worry about this module
again.

## Creating a new release

1. Switch to `master` branch
1. Merge in changes from `development`

1. If you are publishing a major version, Put a copy of the most current major release in `old_styleguides`. Otherwise skip to the next step.
	1. `cd styleguide`
	1. Add a link in `docs/other-versions.scss` in the format of 'version x'
	1. `gulp styleguide-build`
	1. `rm -rf old_styleguides/x` where `x` is the major version of your release (e.g. 3)
	1. `cp -r build/ old_styleguides/x`
	1. `rm -rf old_styleguides/x/y/`, where y is a major release, for all major releases. This removes copies of old styleguides in your current styleguide (the older styleguides should already be stored in `old_styleguides`)
	1. `gulp ci`
	1. `cd ../library`

1. In library, run `yarn i`
1. Run `gulp release-prepare`. This will:
    - Automatically determine the type of release (patch, major, minor)
    - Update the version in `package.json`
    - Update the version in `package.json` for all changed pui modules, and all
    of their dependents.
    - Update `CHANGELOG.md` with auto-generated release notes
    - Update `LATEST_CHANGES.md` with auto-generated release notes for the most
    recent change only
    
1. Look over `LATEST_CHANGES.md` and clean up. Make sure any API changes are in the `breaking changes` section. Use the good version of `LATEST_CHANGES.md` as the new addition to `CHANGELOG.md`
1. From root, run `./update_styleguide.sh` to update local versions of components
   
1. Run `./test.sh` - one final check!

1. Run `gulp release-commit` to commit the release.

1. Run `gulp release-push-packages`. This will:
    - Creates a tag for the new version
    - Pushes version bump and new tag to GitHub
    - Publishes all of the updated node packages to npm
  
1. From the `styleguide` directory: `gulp styleguide-build && cf push` will push to production. Make sure you are targeting the correct space on CF

1. Merge `master` back into `development`

## Setting up a new pairing station:

If your machine was imaged for you on Mavericks, you need to start from the beginning, even though you might not think so.
A machine that starts on Mavericks and upgrades to Sierra is likely to have installation problems (e.g. you cannot install Nokogiri).

### Verify that your machine is connected to the cloud foundry wired network.
1. To check, go system preferences -> network and check if your IP falls in 10.80.-.-
    1. If not, send an ask ticket requesting that your machine be put on the Cloud Foundry wired network. They will want machine name and MAC address.

### Boot into network drive
1. Start up machine while holding down the 'option' key, there should be a network drive available. You may have to wait a little for it to show up.

### Run Sprout-Wrap
1. Follow the README instructions at https://github.com/pivotal-cf/sprout-wrap
    1. You will need to install Xcode, and open it up to accept the agreement
        1. This requires an Apple account. You can get the account ID from an existing computer in the App Store under the 'account' quick link. The password is the 8th oldest Pivotal pairing station password but with the first letter capitalized. If this is not helpful enough, send an email to ask+cf@pivotal.io requesting the credentials for Apple account access.
    1. In step 4 of the README, there is no private key under Volumes. You need to 'ssh-keygen' and then add the new key to your GitHub account
    1. After you have added the ssh-key, you will need to clone something from GitHub (any repo) to confirm GitHub as a host.
    1. In step 6, cd into the 'cf-pivotal-ui' folder in sprout-wrap and run 'soloist'
1. You will run soloist multiple times. Just keep running it unless you get the same error message twice in a row. You will need to run soloist about 5 times most likely.

### Configure WebStorm
1. Go to Preferences -> Editor -> Colors and Fonts -> Font and change the font size to 16.
1. Go to Preferences -> Editor -> Code Style and change tab/indent/continuation indent sizes to 2 for JavaScript/css/scss/html/JSON, and anything else that is needed.
1. Go to Preferences -> Languages & Frameworks -> JavaScript and set the javascript language version to JSX Harmony.
1. Copy https://github.com/pivotal/pivotal_ide_prefs/blob/master/pref_sources/RubyMine/templates/jasmine.xml    into     `~/Library/Preferences/WebStorm10/templates/jasmine.xml`
    This will give you Jasmine live templates after you restart Webstorm.
1. Adding a hot key for swapping between test and implementation code
    1. git clone xray
    1. roughly follow the directions from http://pivotallabs.com/swapping-javascript-spec-implementation-rubymine/
    1. Use the script `xray/scripts/open_spec_or_impl.sh` instead of step 1 in the blog post
        1. Use Webstorm instead of Rubymine
        1. After going to RubyMine -> Preferences -> External Tools -> + in step 2 of the blog post, set 'Working Directory' to $ProjectFileDir$ and uncheck the 'open console' box.

## Acceptance

### Locally Publishing Components for Acceptance
Accepting components with unpublished changes is hard to do in isolation.
If you need an empty project to use that's all set up, check out the [pui-demo-project](https://github.com/pivotal-cf/pui-demo-project).

1. Go to the pivotal-ui working directory:
  `$ cd pivotal-ui/library`
1. Switch to the development branch:
  `$ git co development`
1. Start a Sinopia server (local NPM):
  `$ sinopia .sinopia/config.yaml`
1. Login with `test`,`test`:
  `$ npm login --registry http://localhost:4873/`
1. Run the gulp task:
  `$ gulp my-name-is-nic-i-do-acceptance`
1. Switch to your isolated environment:
  `$ cd ../../acceptance-app`
1. Remove old `node_modules` and reinstall base dependencies (make sure there are no pui-* modules listed as dependencies in the package.json. If there are, remove those lines from the package.json):
  `$ rm -rf node_modules && npm i`
1. Install unpublished packages from Sinopia:
  `$ npm install [package name] --save --registry http://localhost:4873`
1. Rebuild the compiled CSS:
  `$ node ./node_modules/.bin/dr-frankenstyle build`
1. Start the local acceptance server:
  `$ gulp`
1. Press the green button

### Dev Delivery

Before hitting deliver, the following should be done:  

1. Run `gulp ci`.
1. Component checked in the the styleguide. Check for
    * Correct appearance, behavior and rendered HTML.
1. Component checked "in the wild" (outside the styleguide in any form using the NPM modules, such as the [pui-starter-project](https://github.com/pivotal-cf/pui-starter-project)). This can be done with the Sinopia server documented above.
    * Dependencies are correct
    * Sufficient documentation, including of dependencies of the example, to allow you to use the examples assuming no further knowledge about the component
    * Correct appearance, behavior, and HTML
1. [![Build Status](https://snap-ci.com/pivotal-cf/pivotal-ui/branch/development/build_image)](https://snap-ci.com/pivotal-cf/pivotal-ui/branch/development)

