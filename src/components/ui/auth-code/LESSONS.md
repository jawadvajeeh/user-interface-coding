## Button type attribute:

1. reset: The button resets all the controls to their initial values
2. submit: when inside the form element, it will submit the form. Use event.preventDefault() on form onSubmit to prevent the default browser behaviour of form submission
3. button: No default behaviour. Need to provide onClick action to trigger client side interaction

## Input autoComplete attribute

1. one-time-code: enables mobile browsers to auto-fill OTP from SMS.

## Test input against a regex

1. write a regex pattern enclosed between forward slashes
2. pattern.test(value)
```
pattern = /^\d$/
```


## onKeyDown event on the input element

1. triggers when any of the keyboard key is pressed
2. e.key gives the character pressed
3. triggers repeatedly

## onPaste event on the input element

1. use the onPaste attribute
2. event is of type React.ClipboardEvent<HTMLInputElement>
3. event.clipboardData.getData("text") gives the copied text

## The Boolean trick

1. Pass any value to the Boolean(value) to make it return true or false based the truthy or falsy nature of the value

## Controlled and Uncontrolled input 

1. if the value is being read from the state onChange should also be handled to avoid react warnings/error
2. if you still want to read the value from state but dont want to handle onChange, make the input as readonly
