import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

type Handler = (...args: any[]) => void;

/**
 * Remplacement de l'ancien service `Events` d'`ionic-angular`
 * (supprimé depuis Ionic 4). Même API : `publish(topic, ...args)` /
 * `subscribe(topic, handler)` / `unsubscribe(topic, handler?)`.
 *
 * Topics utilisés dans l'app :
 *   user:loggedIn / user:loggedOut
 *   personaluser:loggedIn / personaluser:loggedOut
 *   Pharmacien:loggedIn / laborentin:loggedIn
 */
@Injectable({ providedIn: 'root' })
export class EventsService {
  private channels = new Map<string, Subject<any[]>>();
  private handlerSubs = new Map<Handler, Subscription>();

  private channel(topic: string): Subject<any[]> {
    let subject = this.channels.get(topic);
    if (!subject) {
      subject = new Subject<any[]>();
      this.channels.set(topic, subject);
    }
    return subject;
  }

  publish(topic: string, ...args: any[]): void {
    this.channel(topic).next(args);
  }

  subscribe(topic: string, handler: Handler): Subscription {
    const sub = this.channel(topic).subscribe((args) => handler(...args));
    this.handlerSubs.set(handler, sub);
    return sub;
  }

  unsubscribe(topic: string, handler?: Handler): void {
    if (handler) {
      this.handlerSubs.get(handler)?.unsubscribe();
      this.handlerSubs.delete(handler);
      return;
    }
    // pas de handler : on ferme et recrée le canal
    this.channels.get(topic)?.complete();
    this.channels.delete(topic);
  }
}
