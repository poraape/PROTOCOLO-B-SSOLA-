import { Link, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useState } from 'react';
import {
  Brain,
  CircleHelp,
  Compass,
  FileText,
  Home,
  Menu,
  Network,
  Search,
  Shield,
  X,
} from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';
import { ActionCard } from './ActionCard';
import { BussolaLogoRefined } from './BussolaLogoRefined';
import { A11yControls } from './ui/A11yControls';
import { ProtocolVersionBadge } from './ProtocolVersionBadge';
import { metadata } from '../metadata';

const navLinks = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/decisor', icon: Compass, label: 'Decisor' },
  { href: '/rede', icon: Network, label: 'Rede' },
  { href: '/protocolo', icon: FileText, label: 'Protocolo' },
];

const secondaryLinks = [
  { href: '/sobre', icon: Shield, label: 'Sobre o Protocolo' },
  { href: '/glossario', icon: Brain, label: 'Glossário de Termos' },
  { href: '/faq', icon: CircleHelp, label: 'Ajuda (FAQ)' },
];

export function Layout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="container header-container">
          <Link to="/" className="brand">
            <BussolaLogoRefined height={40} />
            <div className="brand-text">
              <span className="brand-title">Bússola</span>
              <span className="brand-subtitle">de Proteção Escolar</span>
            </div>
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-item ${
                  pathname === item.href ? 'nav-item--active' : ''
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div className="desktop-tools">
              <GlobalSearch />
              <A11yControls />
            </div>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Navegação</span>
              <button
                onClick={closeMenu}
                className="mobile-menu-close"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-search-wrapper">
              <GlobalSearch />
            </div>

            <nav className="mobile-nav-primary">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className={`nav-item ${
                    pathname === item.href ? 'nav-item--active' : ''
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mobile-nav-secondary">
              <p className="mobile-nav-section-title">Recursos</p>
              {secondaryLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className="secondary-nav-item"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="mobile-tools-wrapper">
              <A11yControls />
            </div>
          </div>
        </div>
      )}

      <main className="app-main">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>

      <footer className="app-footer">
        <div className="container footer-container">
          <div className="footer-content">
            <ProtocolVersionBadge version={metadata.version} />
            <p className="footer-copy">
              Bússola de Proteção Escolar &copy; {new Date().getFullYear()}.
              <br />
              Iniciativa independente para apoio a profissionais da educação.
            </p>
          </div>
          <ActionCard />
        </div>
      </footer>
    </div>
  );
}
