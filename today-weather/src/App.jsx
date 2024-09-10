import { createTheme } from '@mui/material'
import SearchAppBar  from './components/Header'
import MenuTab from './components/MenuTab'
import WeatherTable from './components/WeatherInfo'
import WeatherImage from './components/WeatherImage'
import { ThemeProvider } from '@emotion/react'

const theme = createTheme({
  typography: {
    fontFamily: 'Uiyeun'
  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchAppBar />
        <MenuTab />
        <WeatherImage />
        <WeatherTable />
      </ThemeProvider>
    </>
  )
}

export default App
