import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { ContactMap } from 'src/pages/Contact/ContactMap';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

const CONTACT_CARDS = [
  {
    Icon: MapsHomeWorkIcon,
    title: 'Place',
    text: 'Akdeniz University'
  },
  {
    Icon: PhoneIphoneIcon,
    title: 'Phone',
    text: '+90 242 227 4400 (internal 4361)'
  },
  {
    Icon: LocationOnIcon,
    title: 'Address',
    text: 'Akdeniz University\nFaculty of Engineering\nComputer Engineering Department\nAntalya Campus\nDumlupınar Boulevard\n07058 Antalya / TURKEY'
  },
  {
    Icon: EmailIcon,
    title: 'Email',
    text: 'cse at akdeniz.edu.tr'
  }
];

interface ContactCardProps {
  Icon: React.ElementType;
  title: string;
  text: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ Icon, title, text }) => {
  return (
    <Box>
      <Stack direction='row'>
        <Icon fontSize='large' htmlColor='#3193a1' />
        <Box ml={0.5}>
          <Typography variant='h2' mt={0.5} mb={1}>
            {title}
          </Typography>
          <Typography
            color='#4e555b'
            sx={{ whiteSpace: 'pre', fontFamily: "'Poppins', sans-serif" }}>
            {text}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

function Contact() {
  return (
    <Box>
      <Typography variant='h1' mt={4} mb={2} textAlign='center' fontSize={'3rem'}>
        Contact Us
      </Typography>
      <Divider />
      <Stack direction='row' justifyContent='space-around' mt={5}>
        {CONTACT_CARDS.map((props, i) => (
          <ContactCard {...props} key={`contact-card-${i}`} />
        ))}
      </Stack>
      <Box sx={{ mt: 6 }}>
        <ContactMap />
      </Box>
    </Box>
  );
}

export default Contact;
