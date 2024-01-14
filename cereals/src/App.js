import qs from 'query-string'
import Header from './components/Header/Header'
import Filters from './components/Filters/Filters'
import List from './components/List/List'

import data from 'data.json'

import './App.css';
import { useEffect, useState } from 'react';

const filter = (list = [], category = 'all', isLimited = false, isNew = false, search = '') => {
  const next = list
    .filter(item => isNew ? item.isNew : true)
    .filter(item => isLimited ? item.isLimited : true)
    .filter(item => category === 'all' || item.categoryType === category)
    .filter(item => search ?
      item.name.toLowerCase().includes(search.toLowerCase())
      || item.description.toLowerCase().includes(search.toLowerCase())
      || item.categoryType.toLowerCase().includes(search.toLowerCase())
      : true
    )

  return next
}



function App() {
  // console.log('data >>>', data)

  const query = qs.parse(window.location.search)

  const [categoryList, setCategoryList] = useState([{
    id: "all",
    name: "All",
    type: "all",
  }, ...data.categoryList])

  const [currentCategory, setCurrentCategory] = useState(() => {
    return query?.category ? query?.category : 'all'
  })
  const [isLimited, setIsLimited] = useState(() => Boolean(query?.isLimited === 'true'))
  const [isNew, setIsNew] = useState(() => Boolean(query?.isNew === 'true'))
  const [search, setSearch] = useState('')
  const [productList, setProductList] = useState(filter(data.productList, currentCategory, isLimited, isNew, search))

  const pushRouterState = (options) => {
    const q = qs.stringify({
      ...(currentCategory && { category: currentCategory }),
      ...(isLimited && { isLimited: isLimited }),
      ...(isNew && { isNew: isNew }),
      ...(search && { search: search }),
      ...options
    })
    window.history.pushState({}, '', `?${q}`)
  }

  const onCurrentCategoryChange = (value) => {
    const nextCategory = value ?? ''
    const nextProductList = filter(data.productList, value, isLimited, isNew, search)

    setCurrentCategory(nextCategory)
    setProductList(nextProductList)
    pushRouterState({ category: nextCategory })
  }

  const onIsLimitedChange = () => {
    const nextIsLimited = !isLimited
    const nextProductList = filter(data.productList, currentCategory, nextIsLimited, isNew, search)

    setIsLimited(nextIsLimited)
    setProductList(nextProductList)
    pushRouterState({ isLimited: nextIsLimited })
  }

  const onIsNewChange = () => {
    const nextIsNew = !isNew
    const nextProductList = filter(data.productList, currentCategory, isLimited, nextIsNew, search)

    setIsNew(nextIsNew)
    setProductList(nextProductList)
    pushRouterState({ isNew: nextIsNew })
  }

  const searchChange = (search) => {
    const nextSearch = search
    const nextProductList = filter(data.productList, currentCategory, isLimited, isNew, nextSearch)

    setSearch(nextSearch)
    setProductList(nextProductList)
    pushRouterState({ search: nextSearch })
  }

  useEffect(() => {
    console.log('FETCH')
    fetch('/api/product')
      .then((res) => res.json())
      .then(data => console.log('data product', data))
    fetch('/api/category')
      .then((res) => res.json())
      .then(data => console.log('data category', data))
  }, [])


  return (
    <div className="app">
      <Header
        searchChange={searchChange}
        search={search}
      />
      <Filters
        items={categoryList}
        current={currentCategory}
        onCurrentChange={onCurrentCategoryChange}
        onIsLimitedChange={onIsLimitedChange}
        onIsNewChange={onIsNewChange}
        isLimited={isLimited}
        isNew={isNew}
      />
      <List items={productList} />
    </div>
  );
}

export default App;
