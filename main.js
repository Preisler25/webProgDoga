document.addEventListener('DOMContentLoaded', async () => {
    const id = document.querySelector('#id');
    const name = document.querySelector('#name');
    const btn_new = document.querySelector('#btn_new');
    const btn_update = document.querySelector('#btn_update');
    const btn_del = document.querySelector('#btn_del');
    const display = document.querySelector('#display');
    const error = document.querySelector('#error');

    const errorMsg = (msg) => {
        error.style.color = 'red';
        error.innerHTML = msg;
        setTimeout(() => {
            error.innerHTML = '';
        }, 4000);
    }

    const render = (data) => {
        display.innerHTML = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div>
                    <span>${item.id}</span>
                    <span>${item.customer}</span>
                </div>
            `;
            display.appendChild(div);
        });
    }

    const url = 'https://retoolapi.dev/aaEKEH/data';

    const get = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            render(data);
        }
        catch (err) {
            console.log(err);
            errorMsg(err);
        }
    }

    get();

    btn_new.addEventListener('click', async () => {
        try {
            if (name.value === '') {
                errorMsg('Name is required');
                return;
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer: name.value
                })
            });
            const data = await response.json();
            console.log(data);
            get();
        }
        catch (err) {
            console.log(err);
            errorMsg(err);
        }
        
    });

    btn_update.addEventListener('click', async () => {
        try {
            if (id.value === '' || name.value === '') {
                errorMsg('ID is required and Name is required');
                return;
            }
            if (id.value === '') {
                errorMsg('ID is required');
                return;
            }
            if (name.value === '') {
                errorMsg('Name is required');
                return;
            }
            const response = await fetch(`${url}/${id.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer: name.value
                })
            });
            const data = await response.json();
            console.log(data);
            get();
        }
        catch (err) {
            console.log(err);
            errorMsg(err);
        }
    });

    btn_del.addEventListener('click', async () => {
        try {
            if (id.value === '') {
                errorMsg('ID is required');
                return;
            }
            const response = await fetch(`${url}/${id.value}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            get();
        }
        catch (err) {
            console.log(err);
            errorMsg(err);
        }
    });
});