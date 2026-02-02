# Split Keyboard Project
This is a repository where we are trying to create a custom split keyboard using ergogen. 

run with

> ergogen input.yaml -o output

this will create a bunch of files in the output folder, according to what we specified in input.yaml. Our goal is to modify input.yaml until the files look as we wish.

the project began with board-scetch.jpg, which describes the crude design. 

We want to generate cad files ready to be used in a 3D printer and board designs we can send to a pcb manufacturer.


# Known issues

- the ergogen produces something called .jscad for the cases and outlines, but we want it in .stl, convertion? ergogen setting? 
- there are some artifact, holes, in the outline/case files. 
- I have no idea if the pcb's generated are actually correct I need a plan and knowledge about how to check that. It is very unlikely everything has been placed correctly so we proberbly need to nudge electronic parts around.

- Have to add batteries, charging ports etc. 

# ergogen-docs
here I have copied some blog posts, generall information, it could be outdated tho. 

# exaples
here are some clones of repos where other people have made nice boards using ergogen. 