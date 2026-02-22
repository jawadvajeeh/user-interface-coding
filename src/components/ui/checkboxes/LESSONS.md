1. input of type checkbox also has indeterminate state. Its not exposed through attribute, but is explicitly set in Javascript
2. Understand the UI and break it into isolated components connected appropriately through the states
3. For recursive components, state lives at the parent of the recursive component.
4. When extracting UI into its components, make sure its types properly to not loose any native props or benefits like extracting input into its own component
5. Recursion, pre-order (top-down - process current item first, results top-down), post-order (bottom-up, child result matter first)
