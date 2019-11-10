---
title: Let's write a useImageZoom React hook
date: "2019-06-09T23:42:32.169Z"
description: Basic React Hook example explained on a real world scenario.
---

> You can read that post on [dev.to](https://dev.to/bgord/let-s-write-a-useimagezoom-react-hook-5354).

Let's write a useImageZoom React hook

In this article, I am going to present a basic React hook responsible for handling image "zoom" functionality.

## What we are going to build

![](https://media.giphy.com/media/fSvVcoSiGiCoAHjIYf/giphy.gif)

The goal is to create a `useImageZoom` hook that provides three handlers:

- zoom in
- zoom out
- reset zoom

Bearing that in mind, we can already plan the API that hook may expose.

```js
const [zoomStyles, handlers] = useImageZoom();
```

Following prevailing convention, it returns a two-element array.

A first element is a style object applied to an image, and the second element contains the aforementioned handlers.

## Hook implementation

```jsx
// App.jsx

import React from "react":

function useImageZoom(maxZoomLevel = 5) {
  const minZoomLevel = 1;

  const [zoomLevel, setZoomLevel] = React.useState(minZoomLevel);

  function zoomIn() {
    setZoomLevel(zoomLevel =>
      zoomLevel < maxZoomLevel ? zoomLevel + 1 : zoomLevel
    );
  }

  function zoomOut() {
    setZoomLevel(zoomLevel =>
      zoomLevel > minZoomLevel ? zoomLevel - 1 : minZoomLevel
    );
  }

  function resetZoom() {
    setZoomLevel(minZoomLevel);
  }

  const zoomStyles = {
    transform: `scale(${zoomLevel})`,
  };

  const handlers = {
    zoomIn,
    zoomOut,
    resetZoom
  }

  return [zoomStyles, handlers];
}
```

A few words about the implementation.

If we want CSS to handle the image scaling, we need to use `transform` property and pass`scale(x)` as a value. By default, `x` equals **1**, so we assign **1** to the `minZoomLevel` variable.

`maxZoomLevel` is the only parameter that hook accepts, defaults to **5**.

In `zoomIn` and `zoomOut` functions we respectively increase and decrease the zoom level, but keeping it in `maxZoomLevel` and `minZoomLevel` boundary.

`resetZoom` simply sets the `minZoomLevel` value.

## Usage

```jsx
// App.jsx

import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// function useImageZoom(maxZoomLevel = 5) {
//   ...
// }

function App() {
	const [zoomStyles, handlers] = useImageZoom();

	return (
		<div className="app">
			<div className="buttons">
				<button onClick={handlers.zoomIn}>Zoom in</button>
				<button onClick={handlers.zoomOut}>Zoom out</button>
			</div>
			<div className="preview">
				<img
					style={{...zoomStyles}}
					onClick={handlers.resetZoom}
					src="https://placeimg.com/150/150/arch"
					alt="preview box"
				/>
			</div>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

```css
/* styles.css */

.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: sans-serif;
	text-align: center;
}

.buttons {
	margin-top: 50px;
}

.preview {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 300px;
	width: 300px;
	margin-top: 50px;
	background: #eee;
	overflow: auto;
	position: relative;
}
```

Let's see it in action.

![](https://media.giphy.com/media/lSgQKiX3YqrciMpLP5/giphy.gif)

As you may have noticed, we have a problem. Both sides of the image get incrementally cropped as we zoom in.

## Improvements

The issue is that `transform-origin`'s initial value equals `"50% 50%"`, which is equivalent to the center of a given image. To get a sense of what this property does, please refer to [this page](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).

To apply the solution, change `zoomStyles` object to the following:

```js
const zoomStyles = {
	transform: `scale(${zoomLevel})`,
	transformOrigin: "top left",
};
```

Let's see what happens.

![](https://media.giphy.com/media/d96VPH6TXYw9m01nTB/giphy.gif)

Ok, the image does not get cropped, but there is another problem. Have you noticed that there is a blank space on the left and at the top part of the preview box? We can force the image to fill the whole available space but still preserving the initial centered position.

We can do it by positioning the image absolutely in the top left corner of the preview box but only if zoom level greater than 1 is applied.

Change `zoomStyles` object to the following:

```js
const zoomStyles = {
	transform: `scale(${zoomLevel})`,
	transformOrigin: "top left",
	position: zoomLevel > 1 ? "absolute" : undefined,
	top: zoomLevel > 1 ? 0 : undefined,
	left: zoomLevel > 1 ? 0 : undefined,
};
```

Voilà, it works!

![](https://media.giphy.com/media/fSvVcoSiGiCoAHjIYf/giphy.gif)

The final version is available on [codesandbox](https://codesandbox.io/s/epic-moon-suhcj?fontsize=14).

In the next article, we are going to make `useImageZoom` hook more flexible and easier to use. Stay tuned!
