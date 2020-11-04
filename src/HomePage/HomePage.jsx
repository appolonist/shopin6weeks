import React, { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';

import { TopBar } from '../_components'
import { NavigationBar } from '../_components';
import { AdvertBanner } from '../_components';
import { ProductThumbnailList } from '../_components'
import { CreateProductPage } from '../CreateProductPage';
const ProductThumbnailList = React.lazy(()=>import('../_components/ProductThumbnailListComponent/ProductThumbnailList'));

import styles from './style.css';

export function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div>
        <TopBar />
         <NavigationBar />
         <AdvertBanner interval= {3000} images={['../static/img/adverts/advert0.jpg', '../static/img/adverts/advert1.jpg']}/>
          {/* <Suspense fallback={(<div>Loading...</div>)}>
            <ProductThumbnailList />
         </Suspense>  */}
         
      
         
        
    </div>
    );
}


{/*<CreateProductPage />
        <div className="col-lg-8 offset-lg-2 wraper-users-list">
            <h1>Hi {user.firstName}!</h1>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul className="users-list">
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
                <p className="logout"><Link to="/login">Logout</Link></p>
            
        </div> */}