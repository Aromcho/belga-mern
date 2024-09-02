exports.component = name => `import React from 'react';

import {

} from './${name.toLowerCase()}.styles';

export interface ${name}Props {

}

export const ${name} = ({}: ${name}Props) => {
  return (
    <div></div>
  );
};
`;

exports.styles = name => `import styled from '@emotion/styled';

export const ${name} = styled.div\`
  
\`;
`;

exports.barrel = name => `export { ${name} } from './${name.toLowerCase()}';
`;