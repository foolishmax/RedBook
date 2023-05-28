import {observable} from 'mobx';
import Loading from '../components/widget/Loading';
import {getArticleDetail} from './../apis/article';

class ArticleStore {
  @observable article: Article = {} as Article;

  getArticleDetail = async (id: number) => {
    Loading.show();
    try {
      const {data} = await getArticleDetail(id);

      if (data) {
        this.article = data;
      }
    } catch {
      console.log('error');
    } finally {
      Loading.hide();
    }
  };
}

export default ArticleStore;
