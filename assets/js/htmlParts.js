

const clickbait = `</article>
<article class="clickbait">
<figure>
    <img src="assets/images/product5.webp" alt="product">
    <figcaption>
        <h2>Dial in at Home</h2>
        <p>
            Brewing beautiful coffee at home isn’t neuroscience.<br>
            All you need is the right equipment and a little know-how.
        </p>
        <a href="#gear-intro" class="fancy-link">Shop Now</a>
    </figcaption>
</figure>
</article> `;

const article= (id,stock, counter, imageName,label, origin, price)=>( 
`<article class="coffee__product" data-id="${id}" data-stock="${stock}" data-count="${counter}">
<figure>
    <img src="./assets/images/${imageName}" alt="product">
    <figcaption>
        <span class="label">${label}</span>
        <h3>${origin}</h3>
        <span class="label">$${price}.00</span>
    </figcaption>
</figure>
<button class="primary-btn">Add to cart</button>
<a href="product.html?product_id=${id}"></a> 
</article>
` );

const item = (elem)=>{
 
  const price = elem.counter> 1  ? `${elem.price} * ${elem.counter}` : elem.price ;
 return (
      `<div class="item" data-id="${elem.id}" data-quantity="${elem.counter}">
           <img src="./assets/images/${elem.image}" alt="">
           <h1>${elem.label}</h1>
           <p class="price">$${price}</p>
           <div class="modify">
               <a href="#" class="fancy-link">Remove</a>
               &nbsp;/&nbsp;
               <a href="shoppingcart.html" class="fancy-link">Edit</a>
           </div>
       </div>`
      );
};
export  { clickbait as clickbaitHtml, article as articleHtml, item as itemHtml }