<!-- 

1. How did you dynamically create and append new elements to the DOM?

I used createElement() to make new elements and then used appendChild() to add them to the cart so they would show up on the page.

2. What steps did you take to ensure accurate updates to the total price?

I updated the total every time something changed—adding items, removing items, or changing the quantity—by adjusting the total based on the item’s subtotal.

3. How did you handle invalid input for product name or price?
I checked if the name was empty or if the price wasn’t valid. If it was wrong, I showed an alert and didn’t add the item.

4. What challenges did you face when implementing the remove functionality?
Figuring out how to remove the correct item and update the total was tricky at first, but using closest('li') helped solve it. -->