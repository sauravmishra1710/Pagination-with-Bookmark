For a documentation on the pagination component refer to the [README for pagination component](https://github.com/sauravmishra1710/Pagination-Component/blob/main/README.md).

# Pagination-with-Bookmark

A pagination component with ability to bookmark items in the paginated lists. The usecase being if there are a 100 pages in the paginated list and the user wants to bookmark certain items in various pages, the system should allow bookmarking items and provide a reference to the bookmarked items for easy navigation. This project will implement the same to enable bookmarking references for paginated lists.

# Core Idea

The logic to implementing the bookmarks is broken down into the following pieces - 

1. Provide an icon button to bookmark the item when hovered on the row (```onMouseEnter()```). The system should render the button for each row when hovered over & remove the icon on moving to a diferent row (```onMouseLeave()```).
  
2. On clicking the bookmark add icon button, the system should -
    - Create a clickable reference for the bookmarked item.
    - Update the bookmark `ADD` icon to bookmark `REMOVE` icon.
  
3. On clicking the reference for a item, the system should  -
    - should navigate to the particular item.
    - highlight the item to easy recognition
  
5. Provide an icon button to remove the bookmark for a bookmarked item.
   
6. On clicking the bookmark remove icon button, they system should -
    - remove the corresponding reference for the item.
    - update the  bookmark `REMOVE` icon to bookmark `ADD` icon.



