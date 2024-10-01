const classCopies = [];

function copyTo() {
    const from = document.querySelectorAll('[copyto]');
    from.forEach(a => classCopies[a.getAttribute('copyto')] = a.className)
}

function copyFrom() {
    const to = document.querySelectorAll('[copyfrom]');
    to.forEach(a => a.className = classCopies[a.getAttribute('copyfrom')])
}

function processClasses() {
    let allStyles = "";
    const allClass = document.querySelectorAll('[class]');
    let i = 0;
    allClass.forEach(c => {
        let style = c.getAttribute('style') ? c.getAttribute('style') + ";" : "",
            hoverStyle = "", activeStyle = "", focusStyle = "", focusWithinStyle = "", finalClass = "",
            pc = "";

        c.classList.forEach(cl => {
            if (cl.indexOf('h:') != -1) {
                hcl = cl.substring(2, cl.length);
                if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                    if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                        const out = processCustom(hcl);
                        if (out == "") finalClass += hcl + " ";
                        else hoverStyle += out + ";";
                    }
                }
                else if (hcl.indexOf('[') != -1 && pc == "") pc += hcl
                else if (hcl.indexOf(']') != -1 && pc != "") {
                    const out = processCustom(pc += " " + hcl);
                    if (out == "") finalClass += hcl + " ";
                    else hoverStyle += out + ";";
                }
                else if (pc != "") pc += " " + hcl
            }
            else if (cl.indexOf('a:') != -1) {
                hcl = cl.substring(2, cl.length);
                if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                    if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                        const out = processCustom(hcl);
                        if (out == "") finalClass += hcl + " ";
                        else activeStyle += out + ";";
                    }
                }
                else if (hcl.indexOf('[') != -1 && pc == "") pc += hcl
                else if (hcl.indexOf(']') != -1 && pc != "") {
                    const out = processCustom(pc += " " + hcl);
                    if (out == "") finalClass += hcl + " ";
                    else activeStyle += out + ";";
                }
                else if (pc != "") pc += " " + hcl
            }
            else if (cl.indexOf('f:') != -1) {
                hcl = cl.substring(2, cl.length);
                if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                    if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                        const out = processCustom(hcl);
                        if (out == "") finalClass += hcl + " ";
                        else focusStyle += out + ";";
                    }
                }
                else if (hcl.indexOf('[') != -1 && pc == "") pc += hcl
                else if (hcl.indexOf(']') != -1 && pc != "") {
                    const out = processCustom(pc += " " + hcl);
                    if (out == "") finalClass += hcl + " ";
                    else focusStyle += out + ";";
                }
                else if (pc != "") pc += " " + hcl
            }
            else if (cl.indexOf('fw:') != -1) {
                hcl = cl.substring(3, cl.length);
                if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                    if (hcl.indexOf('[') != -1 && hcl.indexOf(']') != -1) {
                        const out = processCustom(hcl);
                        if (out == "") finalClass += hcl + " ";
                        else focusWithinStyle += out + ";";
                    }
                }
                else if (hcl.indexOf('[') != -1 && pc == "") pc += hcl
                else if (hcl.indexOf(']') != -1 && pc != "") {
                    const out = processCustom(pc += " " + hcl);
                    if (out == "") finalClass += hcl + " ";
                    else focusWithinStyle += out + ";";
                }
                else if (pc != "") pc += " " + hcl
            }
            else {
                if (cl.indexOf('[') != -1 && cl.indexOf(']') != -1) {
                    const out = processCustom(cl);
                    if (out == "") finalClass += cl + " ";
                    else style += out + ";";
                }
                else if (cl.indexOf('[') != -1 && pc == "") pc += cl
                else if (cl.indexOf(']') != -1 && pc != "") {
                    pc += " " + cl;
                    const out = processCustom(pc);
                    if (out == "") finalClass += cl + " ";
                    else style += out + ";";
                    pc = "";
                }
                else if (pc != "") pc += " " + cl
            }
        })
        if (style != "" || hoverStyle != "" || focusStyle != "") {
            i++;
            const cname = "nc_" + i;
            c.className = `${finalClass} ${cname}`.trim();
            allStyles += `.${cname} { ${style} } `;
            if (hoverStyle != "") allStyles += `.${cname}:hover { ${hoverStyle} } `;
            if (activeStyle != "") allStyles += `.${cname}:active { ${activeStyle} } `;
            if (focusStyle != "") allStyles += `.${cname}:focus { ${focusStyle} } `;
            if (focusWithinStyle != "") allStyles += `.${cname}:focus-within { ${focusWithinStyle} } `;
        }
    });
    const st = document.createElement('style');
    st.innerText = "* { margin: 0; padding: 0; box-sizing: border-box; }" + allStyles
    document.querySelector('head').appendChild(st)
}

function processCustom(cls) {
    const s = cls.substring(0, cls.indexOf('['));
    const v = cls.substring(cls.indexOf('[') + 1, cls.length - 1);
    return getStyle(s, v)
}

function getStyle(style, value) {
    if (style == "fc-") return `color:${value}`;
    else if (style == "bc-") return `background-color:${value}`;
    else if (style == "ml-") return `margin-left:${value}`;
    else if (style == "mt-") return `margin-top:${value}`;
    else if (style == "mr-") return `margin-right:${value}`;
    else if (style == "mb-") return `margin-bottom:${value}`;
    else if (style == "pl-") return `padding-left:${value}`;
    else if (style == "pt-") return `padding-top:${value}`;
    else if (style == "pr-") return `padding-right:${value}`;
    else if (style == "pb-") return `padding-bottom:${value}`;
    else if (style == "fs-") return `font-size:${value}`;
    else if (style == "ff-") return `font-family:${value}`;
    else if (style == "lh-") return `line-height:${value}`;

    else if (style == "lg-") return `background-image:linear-gradient(${value})`;
    else if (style == "rg-") return `background-image:radial-gradient(${value})`;

    else if (style == "pe-") return `pointer-events:${value}`;
    else if (style == "us-") return `user-select:${value}`;

    else if (style == "wn-") return `min-width:${value}`;
    else if (style == "w-") return `width:${value}`;
    else if (style == "wx-") return `max-width:${value}`;

    else if (style == "hn-") return `min-height:${value}`;
    else if (style == "h-") return `height:${value}`;
    else if (style == "hx-") return `max-height:${value}`;

    else if (style == "gtc-") return `grid-template-columns:${value}`;
    else if (style == "gtr-") return `grid-template-rows:${value}`;
    else if (style == "tr-") return `transition:${value}`;
    else if (style == "an-") return `animation:${value}`;

    else if (style == "jc-") return `justify-content:${value}`;
    else if (style == "ai-") return `align-items:${value}`;
    else if (style == "fd-") return `flex-direction:${value}`;
    else if (style == "ol-") return `outline:${value}`;
    else if (style == "ov-") return `overflow:${value}`;
    else if (style == "fwr-") return `flex-wrap:${value}`;
    else if (style == "fw-") return `font-weight:${value}`;
    else if (style == "ti-") return `text-indent:${value}`;
    else if (style == "ta-") return `text-align:${value}`;
    else if (style == "td-") return `text-decoration:${value}`;
    else if (style == "br-") return `border-radius:${value}`;
    else if (style == "of-") return `object-fit:${value}`;
    else if (style == "bs-") return `box-shadow:${value}`;
    else if (style == "c-") return `cursor:${value}`;
    else if (style == "d-") return `display:${value}`;
    else if (style == "f-") return `flex:${value}`;
    else if (style == "b-") return `border:${value}`;
    else if (style == "m-") return `margin:${value}`;
    else if (style == "o-") return `opacity:${value}`;
    else if (style == "p-") return `padding:${value}`;
    else if (style == "g-") return `gap:${value}`;
    else if (style == "t-") return `transform:${value}`;
    else if (style == "to-") return `transform-origin:${value}`;
    else "";
}

(function () {
    copyTo();
    copyFrom();
    processClasses();
})();