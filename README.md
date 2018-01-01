# mosaic

#### General:

- [ ] Refactor style.css
- [x] Go through this directory and make note of all the TO.DO tags.
- [ ] delete previous deploys

#### Home:

- [ ] menu (contact, FAQ)
- [ ] video

#### Signup:

- [x] password reentry field
- [x] error handling - incorrect password etc
- [ ] email verification?
- [ ] change password option
- [x] login persistence
- [ ] login persistence radio button

#### Dashboard:

- [x] Capitalise profile name
- [x] Add new scene button in navbar
- [x] Upload progress bar
- [x] animate progress bar
- [x] show list of scenes
- [x] scene list styling
- [ ] delete scene option
- [ ] SDK link (to Github)
- [x] Fix the 'no scenes uploaded yet' item

#### Profile:

- [ ] Delete account option
- [ ] Change details - password, name, etc

#### SDK:

- [ ] general outline + review previous notes in `~/ezagutza/cocoapods.md` and `~/ezagutza/swift.md`
- [ ] review .scn inclusion
- [ ] animations
- [ ] hit test interactions

----

#### Notes:

**Version: 0.1.0**

1. Initial release.
2. No known authentication bugs.
3. Using `__session` cookies to monitor persistence.
4. Users can upload files
5. Can't alter files.
6. Can't alter profile information.


----

#### FAQ:

**What is Atlas Reality?**

Atlas is a distribution platform for augmented reality experiences. We let users search for, interact with, and experience AR content, from
any AR compatible app they are using.

**How does this work?**

Developers add our SDK to their apps. This runs in the background, and places an AR menu near to the content of the app they are using. Accessing
this menu provides access to other AR content that would normally be packaged in its own application.

**Why is this interesting?**

We make it easier to find, access, and experience AR content. Currently, any application has to be distributed as a standalone package, that users
must download individually, and then open whenever they want to use it. We believe that AR is more like the web.

Imagine a developer has created a Wall-E robot, that rolls around and collects piles of virtual rubbish. With Atlas, this can be released as a native iOS app,
and also distributed through our network of participating apps. Anyone who uses the Wall-E app can also access the AR content through Atlas in any _other_ app,
and won't have to switch between apps all the time.

**How do I host content?**

Download our SDK and add the following code to your `viewDidLoad() {}`:

    let config = {}
    let atlas = Atlas(self.sceneView, config)

The Atlas menu and functionality will then be added to your application.

**How do I provide content?**

Simply visit atlasreality.xyz, create an account, and upload your content in the dashboard.






















<!--  -->
