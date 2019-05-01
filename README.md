ffff# cody 
> Code repository management

[![CircleCI](https://circleci.com/gh/alexjpaz/cody.svg?style=svg)](https://circleci.com/gh/alexjpaz/cody)

### installation

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
