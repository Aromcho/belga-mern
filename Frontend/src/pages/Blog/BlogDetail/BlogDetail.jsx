import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Importa Helmet
import Register from "../../Register/Register.jsx";
import { Skeleton, Box, Typography, Button } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa'; // Importa el icono de WhatsApp
import { PATHS, SOCIAL } from "../../../../config/index.js"; // Importa las rutas y redes sociales
import {
  FacebookCircleIcon,
  InstaCircleIcon,
  LinkedinCircleIcon,
  MessengerCircleIcon,
  YoutubeCircleIcon,
  WhatsappIcon,
} from "../../../components/Icons/Icons.jsx"; // Iconos Importados
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articule/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el artículo:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    const shareUrl = `http://www.belga.com.ar:8080/noticia/${id}`;
    const shareText = `¡Mira este artículo sobre "${article?.title}" en Belga Inmobiliaria! `;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + shareUrl)}`;

    window.open(whatsappUrl, '_blank');
  };

  const socialInfo = [
    { link: `${SOCIAL.INSTA}`, icon: <InstaCircleIcon /> },
        { link: `${SOCIAL.FACEBOOK}`, icon: <FacebookCircleIcon /> },
        { link: `${SOCIAL.YOUTUBE}`, icon: <YoutubeCircleIcon /> },
        { link: `${SOCIAL.LINKEDIN}`, icon: <LinkedinCircleIcon /> },
        { link: `${SOCIAL.MESSENGER}`, icon: <MessengerCircleIcon /> },
      ];
  if (loading) {
    return (
      <div className="blog-detail-container mt-5 pt-5">
        <Box className="blog-detail-images">
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Box>
        <Typography variant="h2">
          <Skeleton />
        </Typography>
        <Typography variant="h6">
          <Skeleton />
        </Typography>
        <Typography variant="body2">
          <Skeleton width="60%" />
        </Typography>
        <Typography variant="body2">
          <Skeleton width="40%" />
        </Typography>
        <Box mt={2}>
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Box>
      </div>
    );
  }

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div className="blog-detail-container mt-5 pt-5">
      <Helmet>
        <title>{article.title} | Blog Belga Inmobiliaria</title>
        <meta name="description" content={article.subtitle} />
        <meta property="og:title" content={`${article.title} | Blog Belga Inmobiliaria`} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`http://www.belga.com.ar:8080/blog/${id}`} />
        <meta property="og:image" content={article.photos?.[0] || "https://belga.com.ar/images/og_image.png"} />
      </Helmet>

      <h1 className='mt-3'>{article.title}</h1>
      <h6 className="subtitle">{article.subtitle}</h6>
      <p className="date">
        Fecha: {article.fakeDate}
      </p>
      
      <p className="author">
        Publicado por {article.author}
        <div className="social-icons-container-blog">
        <p></p>
        {socialInfo.map((i, k) => (
          <a href={i.link} key={k} target="_blank" rel="noopener noreferrer" className="social-icon-link-blog">
            {i.icon}
          </a>
        ))}
      </div>
      |
        <Button
          color="white"
          startIcon={<WhatsappIcon />}
          onClick={handleShare}
          className="share-button"
          
          
        >
          Compartir en WhatsApp
        </Button>
        
      </p>
      
      
      <div className="blog-detail-images">
        
        {article.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Imagen ${index + 1}`} className="blog-detail-img" />
        ))}
      </div>

      <div className='rich-content' dangerouslySetInnerHTML={{ __html: article.description }} />
      
      
      
      <div>
        <Register />
      </div>
    </div>
  );
};

export default BlogDetail;
