import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Locations from './features/location/location'
import BottomNav from './features/bottom-nav/bottom-nav'
import Home from './features/home/home'
import EditCategory from './features/category/edit-category'
import AddCategory from './features/category/add-category'
import AddLocation from './features/location/add-location'
import EditLocation from './features/location/edit-location'
import Categories from './features/category/categories'
import LocationDetail from './features/location/location-detail'
import LocationMap from './features/location/location-map'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/categories/new" element={<AddCategory />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/new" element={<AddLocation />} />
          <Route path="/locations/edit/:id" element={<EditLocation />} />
          <Route path="/locations/detail/:id" element={<LocationDetail />} />
          <Route path="/locations/map/:id" element={<LocationMap />} />
        </Routes>
      </header>
      <BottomNav />
    </div>
  )
}

export default App
