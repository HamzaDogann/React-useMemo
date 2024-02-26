import React, { useState, useMemo } from 'react';

const ProductList = ({ products }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // Calculate filtered products using useMemo

  const filteredProducts = useMemo(() => {    // useMemo iki değer alır Birinci parametre, bir fonksiyon veya hesaplanmış değeri içerir.
  // İkinci parametre ise bir bağımlılık listesidir ve bu liste içinde belirtilen değerler değiştiğinde, memoized değerin yeniden hesaplanmasını sağlar. (Dependency List) 
   
  console.log('Filtreleme İşlemine Girildi.');
    return products.filter(product =>          
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())      
    );
  
  }, [searchKeyword, products]); // Bağımlılık Listesidir(Dependency list) yalnızca products props değiştiğinde
  //  ya da searchKeyword state'i güncellendiğinde tekrardan bir render işlemine girecektir. 
  // useMemo kullanılmadan filteredProduct düz olarak tanımlansaydı başka bir componentde olan işlem örneğin
  // Sayaç değerinde olan değişikliker komponenti render edicek ve filteredProduct dolayısıyla tekrardan veriyi işleme
  // render etme durumuna girecek ve gereksiz renderler neden olacaktır. Optimize edilmiş kullanımı bu şekildeydi.

  return (
    <div>
      <input
        type="text"
        placeholder="Search Products..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Sayaç: {count}</p>
      <button onClick={() => setCount(count + 1)}>Artır</button>
    </div>
  );
};

const App = () => {

  const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Telefon' },
    { id: 3, name: 'Televizyon' },
    { id: 4, name: 'Saat' },
    { id: 5, name: 'Kulaklık' },
    // ... ve diğer ürünler
  ];

  return (
    <div>
      <h1>Ürün Listesi</h1>
      <ProductList products={products} />
      <hr />
      <h1>Sayaç Bölümü</h1>
      <Counter />
    </div>
  );
};

export default App;
