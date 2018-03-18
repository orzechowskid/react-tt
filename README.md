# react-tt

no-fuss React tooltips

# About

I didn't especially like any of the React tooltip libraries I found out there; either they didn't fit my use-case, they were too big, or they plain didn't work.  react-tt is tiny (<6KB prod-minified), and it doesn't add any extra elements to your DOM or wrap around anything but your tooltip contents, and it tries hard to ensure all tooltip contents fit inside the viewport.

# Getting Started

    $ npm install --save react-tt

# Usage

import/require the module in your usual way:

    import Tooltip from 'react-tt';

and instantiate using `<Tooltip>` (in JSX) or `React.createElement(Tooltip)` (in vanilla JS).  Not much to it.

Here's a simple example in ES6:

```javascript
import Tooltip from 'react-tt';

function HelloComponent(props) {
  return (
    <div>
      <Tooltip>
        <span>
          hello
        </span>
      </Tooltip>
      <span>
        hover over me
      </span>
    </div>
  );
}

export default MyComponent
```

for live examples, clone this repository and run `npm run example` then visit localhost:8080 .

# API

## Tooltip

    React.createElement(Tooltip, props, children)
    
creates a new Tooltip component with the given props and, optionally, some children.

## props.backgroundColor: PropTypes.string

specifies the background color for the tooltip.  Valid values are anything accepted by CSS:
- color names like `red` or `salmon`
- hex strings like `#f8f8f8`
- rgb or rgba strings like `rgba(255, 255, 255, 0.5)`
- hsl strings like `hsl(214, 82%, 51%)`

## props.id: PropTypes.string.isRequired

specifies the id of the tooltip.

## props.location: PropTypes.oneOf([ 'bottom', 'top' ])

specifies the orientation of the tooltip relative to its container.  Defaults to `top`.

## props.spacing: PropTypes.number

specifies the spacing between the tooltip's indicator and its container.  Defaults to `14` (px).

## props.zIndex: PropTypes.number

specifies the tooltip's z-index.  Defaults to 0.

# Development

    $ git clone https://www.github.com/orzechowskid/react-tt.git
    $ npm install
    $ cd src
    [ ... edit edit edit ... ]
    $ npm run example
    $ open http://localhost:8080
    [ ... verify verify verify ... ]
    $ npm run build:prod

# Testing

`npm run test` should run the test suite.  please update it if you add features.
