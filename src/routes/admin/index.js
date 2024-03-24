import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";


const Admin = ({ match }) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path={`${match.url}profile`} exact component={asyncComponent(() => import('../../components/profile/profile'))} />

            <Route path={`${match.url}wallpaperType`} exact component={asyncComponent(() => import('./wallpaperTypes'))} />
            <Route path={`${match.url}wallpaperType/addwallpaperType`} exact component={asyncComponent(() => import('./wallpaperTypes/addwallpaperTypes'))} />
            <Route path={`${match.url}wallpaperType/editwallpaperType`} exact component={asyncComponent(() => import('./wallpaperTypes/addwallpaperTypes'))} />

            <Route path={`${match.url}2dwallpaper`} exact component={asyncComponent(() => import('./wallPaper'))} />
            <Route path={`${match.url}2dwallpaper/add2dwallpaper`} exact component={asyncComponent(() => import('./wallPaper/addWallpaper'))} />
            <Route path={`${match.url}2dwallpaper/edit2dwallpaper`} exact component={asyncComponent(() => import('./wallPaper/addWallpaper'))} />

            <Route path={`${match.url}3dwallpaper`} exact component={asyncComponent(() => import('./wallPaper'))} />
            <Route path={`${match.url}3dwallpaper/add3dwallpaper`} exact component={asyncComponent(() => import('./wallPaper/addWallpaper'))} />
            <Route path={`${match.url}3dwallpaper/edit3dwallpaper`} exact component={asyncComponent(() => import('./wallPaper/addWallpaper'))} />

        </Switch>
    </div>
);

export default Admin;
