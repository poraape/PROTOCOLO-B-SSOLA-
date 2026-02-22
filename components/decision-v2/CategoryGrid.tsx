import { Link } from 'react-router-dom';
import { DOMAIN_UI_DATA } from '../../content/domainUiCopy';
import type { DomainCategory } from '../../types/decision-tree-v2';

interface CategoryGridProps {
  categories: DomainCategory[];
  basePath: string;
}

export const CategoryGrid = ({ categories, basePath }: CategoryGridProps) => {
  return (
    <div className="category-grid">
      {categories.map((category) => {
        const uiInfo = DOMAIN_UI_DATA[category.id];
        return (
          <Link
            to={`${basePath}/${category.id}`}
            key={category.id}
            className="category-card"
            style={{ '--category-color': uiInfo.color } as React.CSSProperties}
          >
            <div className="category-card-icon">
              <uiInfo.Icon size={28} />
            </div>
            <h3 className="category-card-title">{category.label}</h3>
            <p className="category-card-description">{uiInfo.description}</p>
          </Link>
        );
      })}
    </div>
  );
};
