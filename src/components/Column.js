import React from 'react'

export default function column(props) {
    let colitem = props.col;
    let classitem = `col-md-${colitem}`;
  return (
    <div className={classitem}>{props.children}</div>
  )
}
