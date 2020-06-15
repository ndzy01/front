import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import store from '../../mobx/store';
import 'braft-editor/dist/output.css';

import api from '../../http';

function Show(props: any) {
  const [article, setArticle] = useState<any>({});
  useEffect(() => {
    if (props.articleId !== '') {
      api('/tree/getArticleById', 'POST', { id: props.articleId }).then(
        (res) => {
          setArticle(res.data.data);
        }
      );
    }
  }, [props.articleId]);
  return (
    <div>
      <header style={{ fontSize: '2rem' }}>{article.title}</header>
      <p>{article.cTime}</p>
      <p>{article.mTime}</p>
      <div
        className="braft-output-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </div>
  );
}

const NoteShow = () => {
  return useObserver(() => <Show articleId={store.getId()} />);
};

export default NoteShow;
