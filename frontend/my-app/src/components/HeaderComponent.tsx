import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  DropdownButton,
  Dropdown,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap';
import logo from '../dotIT.png';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JumiaProductForListComponent from './JumiaProductForListComponent';

const HeaderComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const { categoryName, page } = useParams();
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let val = event.target.value;
    console.log(val);
    setSearchValue(val);
  };
  const getPlatformFromUrl = (pathname: string): string => {
    if (pathname.includes('jumia')) {
      return 'jumia';
    } else if (pathname.includes('tunisianet')) {
      return 'tunisianet';
    } else if (pathname.includes('mytek')) {
      return 'mytek';
    }

    return 'alkitab';
  };
  const handleSearchButtonClick = () => {
    const searchPath = `/${getPlatformFromUrl(location.pathname)}`;
    window.location.href = searchPath;
  };

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  const renderDropdownItems = () => {
    const platform = getPlatformFromUrl(location.pathname);
    const storedCategoryName = localStorage.getItem(
      'alkitab_selectedCategoryName'
    );

    const handleDropdownSelect = (selectedCategoryName: string) => {
      localStorage.setItem(
        'alkitab_selectedCategoryName',
        selectedCategoryName
      );
    };
    switch (platform) {
      case 'alkitab':
        return (
          <>
            <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Littérature'}`}
                onClick={() => handleDropdownSelect('Littérature')}
                active={storedCategoryName === 'Littérature'}
              >
                Littérature
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Jeunesse'}`}
                onClick={() => handleDropdownSelect('Jeunesse')}
                active={storedCategoryName === 'Jeunesse'}
              >
                Jeunesse
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Bandes dessinées'}`}
                onClick={() => handleDropdownSelect('Bandes dessinées')}
                active={storedCategoryName === 'Bandes dessinées'}
              >
                Bandes dessinées / Comics / Mangas
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Policier & Thriller'}`}
                onClick={() => handleDropdownSelect('Policier & Thriller')}
                active={storedCategoryName === 'Policier & Thriller'}
              >
                Policier & Thriller
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Fantasy & Science-fiction'}`}
                onClick={() =>
                  handleDropdownSelect('Fantasy & Science-fiction')
                }
                active={storedCategoryName === 'Fantasy & Science-fiction'}
              >
                Fantasy & Science-fiction
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Vie pratique & Loisirs'}`}
                onClick={() => handleDropdownSelect('Vie pratique & Loisirs')}
                active={storedCategoryName === 'Vie pratique & Loisirs'}
              >
                Vie pratique & Loisirs
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Tourisme & Voyages'}`}
                onClick={() => handleDropdownSelect('Tourisme & Voyages')}
                active={storedCategoryName === 'Tourisme & Voyages'}
              >
                Tourisme & Voyages
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Arts et spectacles'}`}
                onClick={() => handleDropdownSelect('Arts et spectacles')}
                active={storedCategoryName === 'Arts et spectacles'}
              >
                Arts et spectacles
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Religion & Esotérisme'}`}
                onClick={() => handleDropdownSelect('Religion & Esotérisme')}
                active={storedCategoryName === 'Religion & Esotérisme'}
              >
                Religion & Esotérisme
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Entreprise, économie & droit'}`}
                onClick={() => handleDropdownSelect('Entreprise')}
                active={storedCategoryName === 'Entreprise'}
              >
                Entreprise, économie & droit
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Sciences humaines & sociales'}`}
                onClick={() => handleDropdownSelect('Sciences humaines')}
                active={storedCategoryName === 'Sciences humaines'}
              >
                Sciences humaines & sociales
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Sciences & Techniques'}`}
                onClick={() => handleDropdownSelect('Sciences & Techniques')}
                active={storedCategoryName === 'Sciences & Techniques'}
              >
                Sciences & Techniques
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Scolaire'}`}
                onClick={() => handleDropdownSelect('Scolaire')}
                active={storedCategoryName === 'Scolaire'}
              >
                Scolaire
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Langue'}`}
                onClick={() => handleDropdownSelect('Parascolaire')}
                active={storedCategoryName === 'Parascolaire'}
              >
                Parascolaire
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Encyclopédies'}`}
                onClick={() => handleDropdownSelect('Encyclopédies')}
                active={storedCategoryName === 'Encyclopédies'}
              >
                Dictionnaires / Encyclopédies / Documentation
              </Dropdown.Item>
            </DropdownButton>
          </>
        );
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
          <InputGroup style={{ flex: 1, marginLeft: '150px', width: '700px' }}>
            {renderDropdownItems()}
            <Form.Control
              type="text"
              placeholder="Search By Title, Description ..."
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
