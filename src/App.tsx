import { ConfigProvider } from 'antd';
import Hero from './component/Hero'
import {
  defaultTheme,   // Default theme
  darkTheme,      // Dark theme
} from '@ant-design/compatible';
function App() {

  return (
    <div className="">
      <ConfigProvider theme={darkTheme}>
        <Hero />
      </ConfigProvider >
    </div>
  )
}

export default App
