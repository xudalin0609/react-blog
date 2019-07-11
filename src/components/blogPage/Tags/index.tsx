import * as React from 'react'
import Card from '../Card'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './index.module.scss'
import { getTags } from '../../../api/service';

interface IState {
  tags: string[]
  tagsCount: number
}
interface IProps extends RouteComponentProps {
}

class Tags extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      tags: [],
      tagsCount: 0
    }
  }
  componentDidMount() {
    getTags().then(res => {
      if (res.success && res.data && Object.keys(res.data).length > 0) {
        const { data, count } = res.data
        this.setState({
          tags: data,
          tagsCount: count || 0,
        })
      }
    })
  }
  onClickItem = (tag: string) => {
    const { history } = this.props
    history.push(`/blog?tag=${encodeURIComponent(tag)}`)
  }
  render() {
    const { onClickItem } = this
    const { tags, tagsCount } = this.state
    return (
      <div className={styles.tags}>
        <Card title="标签">
            <div className={styles.tagList}>
              {
                tags.map((tag: string, index: number) => (
                  <div key={index} 
                    onClick={() => {onClickItem(tag)}}
                    className={styles.tag}>{tag}</div>
                ))
              }
            </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(Tags)