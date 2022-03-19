## TreeView Component

**Supported features**
- Static tree content rendering according to initial values
- Lazy loading of the nodes and chldren via DataSource api
- Ability to override `renderItem` - custom rendering of the node

Please explore these features in storybook.

**Tests**  
- Using `react-testing-library` for testing.
- Not all cases are covered in the code but it is a matter of time. Hopefully main idea and coding standards will be clear :)
- Providing tests for some hooks and components.

**What can be done better**
- In scope of optimizations I covered lazy loading which solves a part of the problem with performance.
- In some cases virtualization mechanism should be used to display a huge amount of data in the tree.
- Customization of the component is done partially (renderItem override) but it is easy to extend via exposing some useful tools like hooks for selection and expand/collapse.
Component written in such a way that it can be easily decomposed and tools can be extracted.

### Getting Started

#### First Start:

In your terminal or command line run:

    npm install

#### Starting The Application

    npm start


#### Running Tests

To run tests:

    npm run test

To run tests with coverage:

    npm run test:cov

To run tests in watch mode:

    npm run test:watch
