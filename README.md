# AngularD3Example
Binding the data in the data-driven documents.

D3.js - a JavaScript library for manipulating documents based on data. Angular - a framework that prides itself on its high preformance data binding techniques.

Below I'll review one proper approach to harness all that power. From D3's simulations and forces to SVG injections and template syntax utilization.

## Application Structure
We will separate d3 related code and svg visual elements code.

d3
|- models (will provide us typing dafety and robust instances of datum).
|- directives (will direct elements in how to implement d3 behaviors).
|- d3.service.ts (will expose all the methods to be used by either d3 models and directives or external).

visuals
|- graph
|- shared

## Initializing an Angular application
`npm install -g @angular/cli`
`ng new angular-d3-example`

## Initializing D3
Make sure to install d3 and relevant types declarations:
`npm i --save d3`
`npm i --save-dev @types/d3`

## Interface D3 though Angular
The corect way to use d3 within a framework is to interact with it through a customized interface, one which we will implement as a class, angular service and directives. By working like that, we can separate the core functionalities we are introducing from the components that implement them, making our applications structure more flexible and scalable, and isolating bugs in their proper env.

#### The d3 service
This service will provide us with computional models and behaviors. The getForceDirectedGraph method will return a force directed graph isntance. The applyZoomableBehaviour and applyDragableBehaviour methods will let us bind user interactions with elements to corresponding behavior.

## Force Directed Graph
Creating an instance of ForceDirectedGraph will return an instance

------------------------
ForceDirectedGraph {
  ticker: EventEmitter,
  simulation: Object
}
------------------------

It contains a running `simulation` with the data we provided, along with a ticker holding an event emitter that fires every time the simulation ticks, which we will use like this:

`graph.ticker.subscribe((simulation) => {});`

We'll implement the rest of the methods of the `D3Service` later, we're going to try and bind the simulation data into the document.

## Binding the simulation
We got a hold of our `ForceDirectedGraph` instance. It holds an ever changing data of nodes and their connecting links. You could bind that data to the document the d3 way (like a savage):

-------------------------------------------------------
function ticked() {
    node
        .attr("cx", function (d) { return d.x })
        .attr("cy", function (d) { return d.y });
}
-------------------------------------------------------

This is where Angular's `.muscled { display: flex }`.

## SVG templating with Angular
SVG delayed implementaion resultaed in a restricting namespace separation within the html document. Which is why Angular cannot recognize declared SVG elements in our component templates.

To compile our svg elements properly, we must either:

1. Meticulously keep them visibly nested under the `<svg>` tag.
2. Prefix them with "svg" to let Angular know what's up <svg:line>

## SVG components with Angular
Assigning selectors to components in the SVG namespace will not work the usual way. They must be selected through an attribute selector.

<svg>
    <g [lineExample]></g>
</svg>

import { Component } from '@angular/core';

@Component({
    selector: ['lineExample'],
    template: `<svg:line x1="0" y1="0" x2="100" y2="100"></svg:line>`
})
export class LineExampleComponent {
    constructor() {}
}

## Binding the simulation -visuals
Equipped with ancient svg knowledge, we can start creating visual components that will display our data. Isolated in a visuals folder, we will create shared components and our primary graph folder, that will hold all the code required to display our force directed graph.

visuals
|- graph
|- shared

## Graph visuals
Let's create the root component that will generate the graph and bind it to the document. We can pass along the nodes and links data as the components input variables.

``