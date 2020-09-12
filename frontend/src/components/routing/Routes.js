import React, {Fragment}from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from '../pages/Home'
import CreateJobs from '../pages/CreateJobs'
import Register from '../pages/Register'
import Quotation from '../pages/Quotation'
import MyJobs from '../pages/MyJobs'

export default () => (
  <>
  <Fragment>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={CreateJobs} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/quotation" component={Quotation} />
      <Route exact path="/myjobs" component={MyJobs} />
    </Switch>
  </Fragment>
  </>
)