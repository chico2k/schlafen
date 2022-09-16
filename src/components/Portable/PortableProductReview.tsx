import React from 'react';
import PortableText from 'react-portable-text';
import { SanityBlock, SanityKeyed } from '../../lib/types/sanity';

interface Props {
  state: 'good' | 'bad';
  content?: Array<SanityKeyed<SanityBlock>>;
}

const PortableProductReview: React.FunctionComponent<Props> = ({ content }) => {
  return (
    <div className=''>
      {content && (
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={content}
          serializers={{
            li: ({ children }: any) => (
              <li className='ml-8 list-disc'>{children}</li>
            ),
          }}
        />
      )}
    </div>
  );
};

export default PortableProductReview;
