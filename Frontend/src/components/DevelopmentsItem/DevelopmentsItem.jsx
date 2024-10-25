import React from 'react';
import { Link } from 'react-router-dom';
import './DevelopmentItem.css'; 
import { Card } from 'react-bootstrap';

const DevelopmentItem = ({ development }) => {
    const hasPhotos = development.photos && development.photos.length > 0;

    return (
        <Card className="development-item">
            <Link className="link-full" to={`/emprendimientos/${development.id}`} state={{ development }}>
                <div className="development-image my-5">
                    {hasPhotos ? (
                        <img src={development.photos[0].image} alt={development.name} />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="development-info">
                    <h3 className="development-title">{development.name}</h3>
                    <p className="development-location">{development.location.name}</p>
                </div>
            </Link>
        </Card>
    );
};

export default DevelopmentItem;
