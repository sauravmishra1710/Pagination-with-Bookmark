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
  
# Implementation Details

## State Management
   We use useState to keep track of the currently highlighted row index. We use the folowing states for bookmark functionality.
   
   ### highlightedRow
  This state will control the functionality for highlighting the row in YELLOW (for 2 seconds) when the corresponding bookmark reference is clicked. Based on the state value it applies the following style to the particular row.

   `const [highlightedRow, setHighlightedRow] = useState(null);`
 ```style={{backgroundColor:(Number(highlightedRow) === userId) ? "yellow" : (userId % 2 === 0) ? '#b0e6e0' : '#ffffff'}}```

#### Bookmark Reference Click
```
const handleBookmarkReferenceClick = (id) => {
    const pNo = Math.ceil(id/pageSize);
    setCurrentPage(pNo);
    setHighlightedRow(id);

    setTimeout(() => {
    if (rowRef.current[id]) {
      rowRef.current[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  setTimeout(() => {
    setHighlightedRow(null);
  }, 2000);
}
```

### hoveredRowIndex
This state will control the current hovered row to display or hide the bookmark (ADD/REMOVE) icon.

  `const [hoveredRowIndex, setHoveredRowIndex] = useState(null);`

### bookmarkedItems
This state will maintain the list of items that are currently bookmarked. 
```
const [bookmarkedItems, setBookmarkedItems] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = { bookmarked: false}; // Default state
      return acc;
    }, {})
  );
```
#### Add Bookmark Click
```
const handleBookmarkClick = (id) => {
    setBookmarkedItems((prev) => ({
      ...prev,
      [id]: {
        bookmarked: !prev[id].bookmarked,
      },
    }));
  }
```

## Ref Usage
We use useRef to reference the current table row for scrolling to the corresponding item when clicked the bookmark reference.
```const rowRef = useRef([]);```

Each table row is assigned a ref as - 

```
<tr key={userId} ref={el => (rowRef.current[userId] = el)}
  style={{backgroundColor:(Number(highlightedRow) === userId) ? "yellow" : (userId % 2 === 0) ? '#b0e6e0' : '#ffffff'}}
  onMouseEnter={() => handleMouseEnter(userId)}
  onMouseLeave={() => handleMouseLeave()}
>
```
This will be used when scrolling into the view of the row. Refer the **Bookmark Reference Click** section above for the implementation details for scrolling.

# Demo

https://github.com/user-attachments/assets/4d44da6c-f9b6-4815-91e7-2f767f47fca5

