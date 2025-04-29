import { css } from 'styled-components';

// Responsive mixins for mobile optimization
export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const mobileContainer = css`
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

export const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const centerContent = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const safeArea = css`
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`;

export const responsiveText = {
  heading: css`
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    @media (max-width: 576px) {
      font-size: 1.75rem;
    }
  `,
  subheading: css`
    font-size: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
    
    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  `,
  paragraph: css`
    font-size: 1rem;
    
    @media (max-width: 576px) {
      font-size: 0.9rem;
    }
  `
};

// Helper for responsive padding
export const responsivePadding = css`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

// Helper for responsive margin
export const responsiveMargin = css`
  margin: 2rem;
  
  @media (max-width: 768px) {
    margin: 1.5rem;
  }
  
  @media (max-width: 576px) {
    margin: 1rem;
  }
`;

// Touch-friendly sizing for mobile
export const touchFriendly = css`
  min-height: 44px;
  min-width: 44px;
`; 