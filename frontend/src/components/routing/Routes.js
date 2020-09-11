import React, {Fragment}from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from '../pages/Home'
import CreateJobs from '../pages/CreateJobs'
import Register from '../pages/Register'
import Quotation from '../pages/Quotation'

export default () => (
  <>
  <Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/createjobs" component={CreateJobs} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/quotation" component={Quotation} />
    </Switch>
  </Fragment>
  </>
)