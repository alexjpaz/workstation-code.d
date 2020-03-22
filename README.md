# cody 
> Code repository management

[![CircleCI](https://circleci.com/gh/alexjpaz/cody.svg?style=svg)](https://circleci.com/gh/alexjpaz/cody)

# What is Cody?

**Cody** is a command line utilitity program that helps get various git projects organized and easy to find. The `code.d` directory in your home folder contains the git urls and acts as an index for your projects.

```
# ~/.code.d/github.com
git@github.com:alexjpaz/cody.git
```

Cody can then run various tasks for these repositories

* `pull [pattern]` - pull down all matching repositories
* `search [pattern]` - find the directory the repository is in (see [shell integration](#shell-integration)
* `open [pattern]` - open the git repository in the browser (useful for github.com repositories)

### Installation

```
yarn global add cody
```

You will need to add some git repo urls to the `~/.code.d` directory.

```
mkdir -o ~/.code.d/
echo "git@github.com:alexjpaz/cody.git" >> ~/.code.d/github.com
```

#### Usage

Pull all repositories

```
cody pull
```

Search for a repository and print the directory

```
cody cody
```

### Shell Integration

In order to get the benefit of some features in cody you will need to copy the following into your shell configuration


#### Bash

```
function cody_cd() {
    $(npm bin cody)
    cd $(cat /tmp/cody_result)
}
```
