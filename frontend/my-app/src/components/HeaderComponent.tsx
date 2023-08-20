import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  DropdownButton,Dropdown,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import logo from '../dotIT.png';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JumiaProductForListComponent from './JumiaProductForListComponent';


const HeaderComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = (event.target.value)
    console.log(val);
    setSearchValue(val);
  };
  const urlSegments = window.location.href.split('jumia/');
  let  pathAfterJumia = urlSegments[1];

  let path = `/jumia/${pathAfterJumia}`;

  const handleSearchButtonClick = () => {
    path = `/jumia/?search=/${searchValue}`; // Update the path with the latest searchValue
    window.location.href = path; // Navigate to the new URL
  };

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
      
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between', 
          }}
        >
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="dotIT Logo"
              width="200"
              height="60"
              className="d-inline-block align-top"
              style={{ backgroundColor: 'white', padding: '5px' }}
            />
          </Navbar.Brand>
          <InputGroup
            style={{ flex: 1, marginLeft: '150px', width: '700px' }}
          >
            <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Téléphone')}`}>
                Téléphone & Tablette
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Cuisine')}`}>Cuisine & Electroménager</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Soins')}`}>Santé & Beauté</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('caméras')}`}>Électroniques</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Superette')}`}>Superette</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Mode')}`}>Mode</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Maison & Bureau')}`}>Maison & Bureau</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Informatique')}`}>Informatique</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Jeux')}`}>Jeux vidéos & Consoles</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Sport')}`}>Articles de sport</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Jardin')}`}>Jardin & Plein air</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('auto')}`}>Auto & Moto</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('bébés')}`}>Produits pour bébés</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('chat')}`}>Animalerie</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Jouets')}`}>Jouets & Jeux</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Fournitures')}`}>Fournitures Scolaires</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Scientifique')}`}>Industriel & Scientifique</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/jumia/?categoryName=${('Musique')}`}>Musique</Dropdown.Item>
            </DropdownButton>

            <Form.Control type="text" placeholder="Search By Title, Description ..."
              value={searchValue}
              onChange={handleSearchInputChange}
              onKeyUp={handleKeyUp}
            />
            <Link to={`jumia/?search=${searchValue}`}>
              <Button variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </Link>


          </InputGroup>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
