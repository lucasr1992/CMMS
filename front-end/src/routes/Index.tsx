import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Index/Index';
import Ocorrencia from '../pages/AbrirOcorrencia';
import LogManutencao from '../pages/LogManutencao/index';
import Config from '../pages/LogConfig/index';
import menuManutencao from '../pages/MenuManutencao/index';
import atenderOcorrencia from '../pages/AtenderOcorrencia/index';
import testeVariado from '../pages/Testes/index';





const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/abrirocorrencia" exact  component={Ocorrencia}/>
    <Route path="/manutenc" exact  component={LogManutencao}/>
    <Route path="/config" exact  component={Config}/>
    <Route path="/menumanute" exact  component={menuManutencao}/>
    <Route path="/atenderocorrencia/:num" exact  component={atenderOcorrencia}/>
    <Route path="/testess" exact  component={testeVariado}/>
   

    
  </Switch>
)

export default Routes;