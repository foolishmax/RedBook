import {useMemo} from 'react';
import useStore from '../../stores';

const useArticle = () => {
  const {article} = useStore().articleStore;
  const articleImages = useMemo(() => {
    return article.images?.map(img => ({img}));
  }, [article.images]);
  const articleTags = useMemo(() => {
    return article.tag?.map(t => `#${t}`).join(' ');
  }, [article.tag]);
  return {
    articleImages,
    articleTags,
  };
};

export default useArticle;
