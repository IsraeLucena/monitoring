import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCustom'
})
export class MaskCustomPipe implements PipeTransform {
  private retorno: any = '';

  transform(value: any, args?: any): any {
    switch (args) {
      case 'cep':
        this.retorno = this.cep(value);
        break;
      case 'cnpj':
        this.retorno = this.cnpj(value);
        break;
      case 'cpf':
        this.retorno = this.cpf(value);
        break;
      case 'realFormat':
        this.retorno = this.realFormat(value);
        break;
      case 'tel':
        this.retorno = this.tel(value);
        break;
      case 'priMaiuscula':
        this.retorno = this.primeiraMaiuscula(value);
        break;
      case 'fonesemddi':
        this.retorno = this.fonesemddi(value);
        break;
      case 'datamask':
        this.retorno = this.datamask(value);
        break;
      case 'clearText':
        this.retorno = this.clearText(value);
        break;
      default:
        this.retorno = null;
    }
    return this.retorno;
  }


  cep(value) {
    let str = value + '';
    str = str.replace(/\D/g, '');
    str = str.replace(/^(\d{2})(\d{3})(\d)/, '$1$2-$3');
    return str;
  }

  cnpj(input) {
    let str = input + '';
    str = str.replace(/\D/g, '');
    str = str.replace(/^(\d{2})(\d)/, '$1.$2');
    str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
    str = str.replace(/(\d{4})(\d)/, '$1-$2');
    return str;
  }

  cpf(input) {
    let str = input + '';
    str = str.replace(/\D/g, '');
    str = str.replace(/(\d{3})(\d)/, '$1.$2');
    str = str.replace(/(\d{3})(\d)/, '$1.$2');
    str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return str;
  }

  realFormat(value) {
    function formatReal(int) {
      let tmp = int + '';
      let res = tmp.replace('.', '');
      tmp = res.replace(',', '');
      let neg = false;
      if (tmp.indexOf('-') === 0) {
        neg = true;
        tmp = tmp.replace('-', '');
      }
      if (tmp.length === 1) {
        tmp = '0' + tmp;
      }
      tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
      if (tmp.length > 6) {
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
      }
      if (tmp.length > 9) {
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3');
      }
      if (tmp.length > 12) {
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2.$3,$4');
      }
      if (tmp.indexOf('.') === 0) {
        tmp = tmp.replace('.', '');
      }
      if (tmp.indexOf(',') === 0) {
        tmp = tmp.replace(',', '0,');
      }
      return neg ? '-' + tmp : tmp;
    }

    return 'R$ ' + formatReal(value);
  }

  tel(input) {
    let str = input + '';
    if (str.length > 11) {
      str = str.substring(3, str.length);
    }
    str = str.replace(/\D/g, '');
    if (str.length === 13) {
      str = str.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1($2)$3-$4');
    } else
      if (str.length === 12) {
        str = str.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1($2)$3-$4');
      } else
        if (str.length === 11) {
          str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
        } else {
          str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
        }
    return str;
  }


  primeiraMaiuscula(text) {
    if (text) {
      let words = text.toLowerCase().split(' ');
      for (let a = 0; a < words.length; a++) {
        let w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
      }
      return words.join(' ');
    }
    return null;
  }

  fonesemddi(input) {
    if (input) {
      return input.substring(2);
    }
    return null;
  }

  datamask(input) {
    if (input) {
      return input.replace(/-/g, '/');
    }
    return null;
  }

  clearText(input) {
    if (input) {
      // return input.replace(/[^\w\s]/gi, '');
      return input.replace(/[^0-9]/gi, '');
    }
    return null;
  }

}
