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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import JumiaProductForListComponent from './JumiaProductForListComponent';

const HeaderComponent = () => {
 
 const [searchVal, setSearchVal] = useState<string>('');
 

  const location = useLocation();
  
  const navigate = useNavigate();
  useEffect(() => {
    
      if (
        !location.pathname.includes('alkitab') &&
        !location.pathname.includes('jumia') &&
        !location.pathname.includes('tunisianet') &&
        !location.pathname.includes('mytek')
      ) {
        // Clear the relevant localStorage items
        localStorage.removeItem('storedSearchValue');
        localStorage.removeItem('alkitab_selectedCategoryName');
        localStorage.removeItem('currentPage');
          
        
      }
  }, [location.pathname]);

  let storedSearchValue = localStorage.getItem('storedSearchValue');
  if (storedSearchValue === undefined || storedSearchValue === null) storedSearchValue = ''
  
  let categoryValue = localStorage.getItem('alkitab_selectedCategoryName');
  if (categoryValue === undefined || categoryValue === null)
    categoryValue = '';

  let pageNum = localStorage.getItem('currentPage');
  if (pageNum === undefined || pageNum === null) pageNum = '';
  
  const handleSearchInputChange = () => {
    
      let storedSearchValue = localStorage.getItem('storedSearchValue');
      if (storedSearchValue === undefined || storedSearchValue === null)
        storedSearchValue = '';
    

    const platform = getPlatformFromUrl(location.pathname);
    let newPath = location.pathname;
    switch (platform) {
      case 'alkitab':
        if (categoryValue || storedSearchValue) {
          newPath = `${newPath}?categoryName=${categoryValue}&page=${pageNum}&search=${storedSearchValue}`;
        } else {
          newPath = `${newPath}?page=${pageNum}`;
        }
        navigate(newPath);
        break;
      case 'tunisianet':
        if (categoryValue || storedSearchValue) {
          newPath = `${newPath}?categoryName=${categoryValue}&search=${storedSearchValue}&page=${pageNum}`;
        } else {
          newPath = `${newPath}?page=${pageNum}`;
        }
        navigate(newPath);
        break;
      case 'mytek':
        if (categoryValue || storedSearchValue) {
          newPath = `${newPath}?categoryName=${categoryValue}&search=${storedSearchValue}&page=${pageNum}`;
        } else {
          newPath = `${newPath}?page=${pageNum}`;
        }
        navigate(newPath);
        break;
      case 'jumia':
        if (categoryValue || storedSearchValue) {
          newPath = `${newPath}?categoryName=${categoryValue}&search=${storedSearchValue}&page=${pageNum}`;
        } else {
          newPath = `${newPath}?page=${pageNum}`;
        }
        navigate(newPath);
        break;
    }
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

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
       const value = event.target.value;

       localStorage.setItem('storedSearchValue', value);
       pageNum =''

       const platform = getPlatformFromUrl(location.pathname);
       let newPath = location.pathname;
       switch (platform) {
         case 'alkitab':
           if (categoryValue || storedSearchValue) {
             newPath = `${newPath}?categoryName=${
               categoryValue 
             }&page=${pageNum}&search=${storedSearchValue}`;
           } else {
             newPath = `${newPath}?page=${pageNum}`;
           }
           navigate(newPath);
           break;
         case 'tunisianet':
           if (categoryValue || storedSearchValue) {
             newPath = `${newPath}?categoryName=${categoryValue}&search=${storedSearchValue}&page=${pageNum}`;
           } else {
             newPath = `${newPath}?page=${pageNum}`;
           }
            navigate(newPath);
           break;
         case 'mytek':
           if (categoryValue || storedSearchValue) {
             newPath = `${newPath}?categoryName=${categoryValue}&search=${storedSearchValue}&page=${pageNum}`;
           } else {
             newPath = `${newPath}?page=${pageNum}`;
           }
            navigate(newPath);
           break;
         case 'jumia':
           if (categoryValue || storedSearchValue) {
             newPath = `${newPath}?categoryName=${categoryValue}&search=${storedSearchValue}&page=${pageNum}`;
           } else {
             newPath = `${newPath}?page=${pageNum}`;
           }
            navigate(newPath);
           break;
       }
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
                to={`/alkitab/?categoryName=${'Littérature'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Littérature')}
                active={storedCategoryName === 'Littérature'}
              >
                Littérature
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Jeunesse'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Jeunesse')}
                active={storedCategoryName === 'Jeunesse'}
              >
                Jeunesse
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Bandes dessinées'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Bandes dessinées')}
                active={storedCategoryName === 'Bandes dessinées'}
              >
                Bandes dessinées / Comics / Mangas
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Policier & Thriller'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Policier & Thriller')}
                active={storedCategoryName === 'Policier & Thriller'}
              >
                Policier & Thriller
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Fantasy & Science-fiction'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() =>
                  handleDropdownSelect('Fantasy & Science-fiction')
                }
                active={storedCategoryName === 'Fantasy & Science-fiction'}
              >
                Fantasy & Science-fiction
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Vie pratique & Loisirs'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Vie pratique & Loisirs')}
                active={storedCategoryName === 'Vie pratique & Loisirs'}
              >
                Vie pratique & Loisirs
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Tourisme & Voyages'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Tourisme & Voyages')}
                active={storedCategoryName === 'Tourisme & Voyages'}
              >
                Tourisme & Voyages
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Arts et spectacles'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Arts et spectacles')}
                active={storedCategoryName === 'Arts et spectacles'}
              >
                Arts et spectacles
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Religion & Esotérisme'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Religion & Esotérisme')}
                active={storedCategoryName === 'Religion & Esotérisme'}
              >
                Religion & Esotérisme
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Entreprise, économie & droit'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Entreprise')}
                active={storedCategoryName === 'Entreprise'}
              >
                Entreprise, économie & droit
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Sciences humaines & sociales'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Sciences humaines')}
                active={storedCategoryName === 'Sciences humaines'}
              >
                Sciences humaines & sociales
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Sciences & Techniques'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Sciences & Techniques')}
                active={storedCategoryName === 'Sciences & Techniques'}
              >
                Sciences & Techniques
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Scolaire'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Scolaire')}
                active={storedCategoryName === 'Scolaire'}
              >
                Scolaire
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Langue'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Parascolaire')}
                active={storedCategoryName === 'Parascolaire'}
              >
                Parascolaire
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/alkitab/?categoryName=${'Encyclopédies'}&search=${storedSearchValue}&page=${pageNum}`}
                onClick={() => handleDropdownSelect('Encyclopédies')}
                active={storedCategoryName === 'Encyclopédies'}
              >
                Dictionnaires / Encyclopédies / Documentation
              </Dropdown.Item>
            </DropdownButton>
          </>
        );
      case 'jumia':
        return (
          <>
            <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Téléphone & Tablette'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Téléphone & Tablette')}
                active={storedCategoryName === 'Téléphone & Tablette'}
              >
                Téléphone & Tablette
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Cuisine & Arts Culinaires'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('Cuisine & Arts Culinaires')
                }
                active={storedCategoryName === 'Cuisine & Arts Culinaires'}
              >
                Cuisine & Arts Culinaires
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'maquillage cheveux'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('visage cheveux')}
                active={storedCategoryName === 'visage cheveux'}
              >
                Santé & Beauté
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Électroniques'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Électroniques')}
                active={storedCategoryName === 'Électroniques'}
              >
                Électroniques
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Papier'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Papier')}
                active={storedCategoryName === 'Papier'}
              >
                Papier
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'T-shirt jupes'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('T-shirt jupes')}
                active={storedCategoryName === 'T-shirt jupes'}
              >
                Mode
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'électroménager'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('électroménager')}
                active={storedCategoryName === 'électroménager'}
              >
                Electroménager
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Informatique'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Informatique')}
                active={storedCategoryName === 'Informatique'}
              >
                Informatique
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'manette playstation'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('manette playstation')}
                active={storedCategoryName === 'manette playstation'}
              >
                Jeux Vidéos
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Fitness'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Fitness')}
                active={storedCategoryName === 'Fitness'}
              >
                Articles de sport
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Jardin'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Jardin')}
                active={storedCategoryName === 'Jardin'}
              >
                Jardin & Plein air
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'automobile'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('automobile')}
                active={storedCategoryName === 'automobile'}
              >
                Auto & Moto
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'bébés'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('bébés')}
                active={storedCategoryName === 'bébés'}
              >
                Produits pour bébés
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Animal'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Animal')}
                active={storedCategoryName === 'Animal'}
              >
                Animalerie
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/jumia/?categoryName=${'Musique'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Musique')}
                active={storedCategoryName === 'Musique'}
              >
                Instruments de Musique
              </Dropdown.Item>
            </DropdownButton>
          </>
        );
      case 'mytek':
        return (
          <>
            <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'informatique'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('informatique')}
                active={storedCategoryName === 'informatique'}
              >
                Informatique
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'Gaming'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Gaming')}
                active={storedCategoryName === 'Gaming'}
              >
                Gaming PC
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'smartphone'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('smartphone')}
                active={storedCategoryName === 'smartphone'}
              >
                TELEPHONIE & MONTRE CONNECTÉE
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'Electroménager'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Electroménager')}
                active={storedCategoryName === 'Electroménager'}
              >
                Electroménager
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'Téléviseurs'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Téléviseurs')}
                active={storedCategoryName === 'Téléviseurs'}
              >
                TV | Photo & Son
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'brico jardin'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('brico jardin')}
                active={storedCategoryName === 'brico jardin'}
              >
                MAISON | BRICO & ANIMALERIE
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'rangement meuble '}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('rangement meuble ')}
                active={storedCategoryName === 'rangement meuble '}
              >
                Rangement Meuble
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'imprimante'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('imprimante')}
                active={storedCategoryName === 'imprimante'}
              >
                Impression
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'onduleur routeur switcheur biométrie'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('onduleur routeur switcheur biométrie')
                }
                active={
                  storedCategoryName === 'onduleur routeur switcheur biométrie'
                }
              >
                Réseaux ET Sécurité
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'scolaire'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('scolaire')}
                active={storedCategoryName === 'scolaire'}
              >
                Bureautique
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'Jardin'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Jardin')}
                active={storedCategoryName === 'Jardin'}
              >
                Jardin & Plein air
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'byciclette scooter'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('byciclette scooter')
                }
                active={storedCategoryName === 'byciclette scooter'}
              >
                Moto | Sport Et Loisirs
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'jouets'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('jouets')}
                active={storedCategoryName === 'jouets'}
              >
                Jeux et Jouets
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'Bébés'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Bébés')}
                active={storedCategoryName === 'Bébés'}
              >
                Produits Pour bébés
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/mytek/?categoryName=${'Magazine'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Magazine')}
                active={storedCategoryName === 'Magazine'}
              >
                Magazine
              </Dropdown.Item>
            </DropdownButton>
          </>
        );
      case 'tunisianet':
        return (
          <>
            <DropdownButton id="dropdown-basic-button" title="All">
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'Ordinateur'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Ordinateur')}
                active={storedCategoryName === 'Ordinateur'}
              >
                Ordinateurs
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'Accessoires souris clavier'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('Accessoires souris clavier')
                }
                active={storedCategoryName === 'Accessoires'}
              >
                Accessoires ET Peripheriques
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'smartphone'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('smartphone')}
                active={storedCategoryName === 'smartphone'}
              >
                TELEPHONIE & MONTRE CONNECTÉE
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'laver chauffage'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('laver chauffage')}
                active={storedCategoryName === 'laver chauffage'}
              >
                Electroménager
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'Téléviseurs'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Téléviseurs')}
                active={storedCategoryName === 'Téléviseurs'}
              >
                TV | Photo & Son
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'alarme enregistreur détecteur'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('alarme enregistreur détecteur')
                }
                active={storedCategoryName === 'alarme enregistreur détecteur'}
              >
                Sécurité
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'imprimante scanner photocopieur'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('imprimante scanner photocopieur')
                }
                active={
                  storedCategoryName === 'imprimante scanner photocopieur'
                }
              >
                Impression
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'réseaux switch routeur câble'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('réseaux switch routeur câble')
                }
                active={storedCategoryName === 'réseaux switch routeur câble'}
              >
                Réseaux ET Sécurité
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'scolaire papier classement tableaux'}&search=${storedSearchValue}`}
                onClick={() =>
                  handleDropdownSelect('scolaire papier classement tableaux')
                }
                active={
                  storedCategoryName === 'scolaire papier classement tableaux'
                }
              >
                Bureautique
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'beauté soin'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('beauté soin')}
                active={storedCategoryName === 'beauté soin'}
              >
                Entretien - Soin
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'disque interne externe'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('disque interne externe')}
                active={storedCategoryName === 'disque interne externe'}
              >
                Disques
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'Tablette'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('Tablette')}
                active={storedCategoryName === 'Tablette'}
              >
                Tablettes
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to={`/tunisianet/?categoryName=${'console manette'}&search=${storedSearchValue}`}
                onClick={() => handleDropdownSelect('console manette')}
                active={storedCategoryName === 'console manette'}
              >
                Console Et Jeux
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
              value={searchVal}
              onChange={(event) => {
                setSearchVal(event.target.value);
                localStorage.setItem('storedSearchValue', event.target.value);
              }}
              onKeyUp={handleKeyUp}
            />
            <Button
              variant="warning"
              onClick={handleSearchInputChange}
            >
              <i className="bi bi-search text-dark"></i>
            </Button>
          </InputGroup>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
