# cody
Code repository management

### Shell Integration

In order to get the benefit of some features in cody you will need to copy the following into your shell configuration


#### Bash

```
function cody_cd() {
    $(npm bin cody)
    cd $(cat /tmp/cody_result)
}
```
