import { Link } from "@tanstack/react-router";
import {
  ArrowBigUp,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";

const SkillCard = ({
  authorEmail,
  category,
  createdAt,
  description,
  id,
  title,
  installCommand,
  tags,
}: SkillRecord) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <article className="skill-card">
      <Link
        to="/skills"
        tabIndex={-1}
        aria-label={`Open ${title}`}
        className="overlay"
      />
      <div className="chrome">
        <div className="chrome-bar">
          <div className="lights">
            <div className="light red" />
            <div className="light amber" />
            <div className="light green" />
          </div>
          <div className="host">registry.sh</div>
        </div>
      </div>
      <div className="body">
        <div className="meta">
          <div className="author">
            <img src="/logo512.png" alt="author avatar" className="avatar" />
            <div className="author-copy">
              <p>Evans</p>
              <p>{new Date(createdAt as string).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="category">{category}</p>
        </div>
        <div className="summary">
          <Link to="skills" className="title-link">
            <h3>{title}</h3>
          </Link>
          <p>{description}</p>
        </div>
        <div className="command">
          <div className="command-copy">
            <span>{"_>"}</span>
            <p>{installCommand}</p>
          </div>
          <button type="button" className="copy" onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <div className="footer">
          <div className="stats">
            <button type="button" className="upvote">
              <ArrowBigUp size={16} fill="currentColor" />
              <span>{tags.length}</span>
            </button>
            <div className="comments">
              <MessageSquare size={14} />
              <span>{authorEmail ? 1 : 0}</span>
            </div>
          </div>
          <div className="actions">
            <Link to="/skills" className="open" title={`Open ${title}`}>
              <span>open</span>
              <ArrowUpRight size={16} />
            </Link>
            <button
              type="button"
              className="save"
              aria-label="Saved state"
              disabled
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SkillCard;
