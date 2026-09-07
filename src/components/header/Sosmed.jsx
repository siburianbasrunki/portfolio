import { Icon } from "../../lib/icons";

const Sosmed = ({ links = [] }) => {
  if (links.length === 0) return null;

  return (
    <div className="header-socials">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.platform}
        >
          <Icon name={link.iconKey} />
        </a>
      ))}
    </div>
  );
};

export default Sosmed;
