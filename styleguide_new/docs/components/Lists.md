# Lists

## Description


## Basic Usage

### Breadcrumb
 
```jsx
::title=Breadcrumb List
<div>
    <BreadcrumbList>
      <ListItem><a href="/">Home</a></ListItem>
      <ListItem><a href="/react.html">React</a></ListItem>
      <ListItem className="current"><span>Lists</span></ListItem>
    </BreadcrumbList>
</div>
```

### Draggable

```jsx
::title=Draggable List
<div>
    <DraggableList className="my-list-class" innerClassName="my-item-class">
      <DraggableListItem>
        Get me out of here!
      </DraggableListItem>
    
      <DraggableListItem>
        LOL
      </DraggableListItem>
    
      <DraggableListItem>
        Can't stop
      </DraggableListItem>
    
      <DraggableListItem>
       Get me out of here!
      </DraggableListItem>
    
      <DraggableListItem>
       LOL
      </DraggableListItem>
    
      <DraggableListItem>
       Can't stop
      </DraggableListItem>
    </DraggableList>
</div>
```

### Inline

```jsx
::title=Inline List
<div>
    <InlineList>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </InlineList>
</div>
```    

### Ordered

```jsx
::title=Ordered List
<div>
    <OrderedList>
     <ListItem>Item 1</ListItem>
     <ListItem>Item 2</ListItem>
     <ListItem>Item 3</ListItem>
    </OrderedList>
</div>
```


```jsx
::title=Ordered Unstyled List
<OrderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</OrderedList>
```

### Unordered

```jsx
::title=Unordered List
<div>
    <UnorderedList>
      <ListItem>feep</ListItem>
      <ListItem>fop</ListItem>
      <ListItem>meep</ListItem>
    </UnorderedList>
</div>
```


## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
className | no | String  |       | Classname of the list
unstyled  | no | Boolean | false | Whether to style the list
divider   | no | Boolean | false | Whether to include a divider between items