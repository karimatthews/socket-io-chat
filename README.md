# Cordial Chat

A zero-fuss way for users of your website to chat with each other. See it in action [here](https://karimatthews.github.io/socket-io-chat/).

## Installation

Insert the following script tag somewhere in your page:

```
<script>
  document.body.insertAdjacentHTML('beforeend',
    "<iframe style='position: fixed; bottom: 0; right: 0; height: 300; width: 300;' src='https://cordial-chat.herokuapp.com' name='" + document.location.origin + "' />"
  )
</script>
```

If you're uncomfortable putting a script tag in, you can figure out your page's origin and just put the iframe in yourself.
