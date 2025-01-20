import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import MyRount from './routes/MyRoutes';


const App = () => {
    return (
        <div>
          <BrowserRouter>
            <MyRount/>
          </BrowserRouter>
      </div>
    );
}

export default App;