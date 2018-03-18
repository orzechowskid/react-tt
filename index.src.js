import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from '../src/index';

const t1 =
`<div>
  <span>hover over me</span>
  <Tooltip>
    <img src="frank.jpg" />
  </Tooltip>
</div>`;
const t2 =
`<div>
  <span>hover over me</span>
  <Tooltip location="bottom">
    <img src="frank.jpg" style={{ margin: '6px' }}/>
  </Tooltip>
</div>`;
const t3 =
`<div>
  <span>hover over me</span>
  <Tooltip>
    <span>here is a tooltip with some text</span>
  </Tooltip>
</div>`;
const t4 =
    `<Tooltip backgroundColor="red">
  <span className="my-class">
    {myTooltipText}
  </span>
</Tooltip>`;

ReactDOM.render(
    <div>
        <p>
            by default, the tooltip renders above its element...
        </p>
        <div className="example">
            <pre>{t1}</pre>
            <div className="arrow">&rarr;</div>
            <div>
                <div>
                    <span>hover over me</span>
                    <Tooltip id="t1">
                        <img alt="" src="frank.jpg" />
                    </Tooltip>
                </div>
            </div>
        </div>
        <p>
            ...but that can be changed with the <tt>location</tt> prop:
        </p>
        <div className="example">
            <div>
                <pre>{t2}</pre>
            </div>
            <div className="arrow">&rarr;</div>
            <div>
                <div>
                    <span>hover over me</span>
                    <Tooltip
                        id="t2"
                        location="bottom"
                    >
                        <img alt="" src="frank.jpg" style={{ margin: `6px` }} />
                    </Tooltip>
                </div>
            </div>
        </div>
        <p>
            right now, only <tt>bottom</tt> and <tt>top</tt> are supported.
        </p>
        <p>
            you can also put text inside your tooltip, of course:
        </p>
        <div className="example">
            <div aria-labelledby="t3">
                <pre>{t3}</pre>
            </div>
            <div className="arrow">&rarr;</div>
            <div>
                <span>hover over me</span>
                <Tooltip id="t3">
                    here is a tooltip with some text
                </Tooltip>
            </div>
        </div>
        <p>
            ...but it probably won't show up too well since by default the tooltip background is dark and (most likely) so is your text.  Let's change that with the <tt>backgroundColor</tt> prop:
        </p>
        <div className="example">
            <div>
                <pre>{t4}</pre>
            </div>
            <div className="arrow">&rarr;</div>
            <div>
                <span>hover over me</span>
                <Tooltip
                    backgroundColor="red"
                    id="t4"
                >
                    <div style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                        here is a styled tooltip with styled text inside of it
                    </div>
                </Tooltip>
            </div>
        </div>
        <p>
            much better!  This prop accepts any string corresponding to a valid CSS color rule, so named colors like <tt>salmon</tt> are okay as well as <tt>#rrggbb</tt>, <tt>rgb(r, g, b)</tt>, and so on.
        </p>
    </div>
    , document.getElementById(`app`));
